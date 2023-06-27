import { ApiPromise } from '@polkadot/api';
import {web3FromAddress} from "@polkadot/extension-dapp";

export interface CreateModelVO {

    // 模型hash， 文件上传后返回的hash值
    hash: string
    // 模型名
    name: string
    // 模型下载链接
    link: string
    // 图片列表
    images: ImageVO[]
    // 下载价格
    downloadPrice: number
    // markdown 备注
    comment: string
}

export interface ImageVO {
    image: string
    imageLink: string
}

export interface CreatePostVO {
    // 模型hash
    modelHash: string
    // 主题名
    name: string
    // 图片列表
    images: ImageVO[]
    // markdown 备注
    comment: string
}

export interface NFT {

}

export type Callback = ((status: any )=> void )| undefined

export interface AiShowChain {

    // 创建模型
    createModel(createModelVO: CreateModelVO, callback: Callback ): Promise<void>
    // 创建模型下的post（模型图片）
    createPost(createPostVO: CreatePostVO, callback: Callback): Promise<void>
    // 购买模型
    buyModel(modelHash: string, callback: Callback): Promise<void>
    // 模型详情
    modelDetail(modelHash: string): Promise<CreateModelVO>
    // 模型列表
    modelList(): Promise<CreateModelVO[]>
    // 用户模型列表
    userModelList(address: string): Promise<CreateModelVO[]>

    // postList
    postList(modelHash: string): Promise<CreatePostVO[]>
    // nft list
    nftList(): Promise<NFT[]>
}


/*
    // 以下需要配置为全局
    const allInjected = await web3Enable('my cool dapp');
    console.log(allInjected)
    const allAccounts = await web3Accounts();
    const account = allAccounts[0].address
    const wsProvider = new WsProvider('wss://ws.aishow.hamsternet.io');
    const api = await ApiPromise.create({provider: wsProvider});
    // 以上需要配置为全局

    const client = new PolkadotAiChanClient(api,account)
    await client.buyModel("abc",(status ) => {
        console.log(status)
    })
 */
export class PolkadotAiChanClient implements AiShowChain{

    private api: ApiPromise

    private readonly sender: string

    constructor(api: ApiPromise,sender: string) {
        this.api = api
        this.sender = sender
    }

    async createModel( createModelVO: CreateModelVO,callback: Callback ) {
        const injector = await web3FromAddress(this.sender)
        const unsub = await this.api.tx.aiModel.createAiModel(
            createModelVO.hash,
            createModelVO.name,
            createModelVO.link,
            createModelVO.images.map(t => t.image),
            createModelVO.images.map(t => t.imageLink),
            createModelVO.downloadPrice,
            createModelVO.comment
        ).signAndSend(this.sender, {signer: injector.signer}, (result) => {
            if (result.status.isInBlock) {
                if(result.dispatchError){
                    if(callback) {
                        callback(result.dispatchError.toHuman())
                    }
                    unsub()
                    return
                }
                console.log(`Transaction included at blockHash ${result.status.asInBlock}`);
                if(callback) {
                    callback("inBlock")
                }
            } else if (result.status.isFinalized) {
                console.log(`Transaction finalized at blockHash ${result.status.asFinalized}`);
                if(callback) {
                    callback("finalized")
                }
                unsub();
            }
        });
    }

    async createPost(createPostVO: CreatePostVO, callback: Callback) {
        const injector = await web3FromAddress(this.sender)
        const unsub = await this.api.tx.aiModel.createAiImage(
            createPostVO.modelHash,
            createPostVO.name,
            createPostVO.images.map(t => t.image),
            createPostVO.images.map(t => t.imageLink),
            createPostVO.comment
        ).signAndSend(this.sender, {signer: injector.signer}, (result) => {
            if(result.dispatchError){
                if(callback) {
                    callback(result.dispatchError.toHuman())
                }
                unsub()
                return
            }
            if (result.status.isInBlock) {
                console.log(`Transaction included at blockHash ${result.status.asInBlock}`);
                if(callback) {
                    callback("inBlock")
                }
            } else if (result.status.isFinalized) {
                console.log(`Transaction finalized at blockHash ${result.status.asFinalized}`);
                if(callback) {
                    callback("finalized")
                }
                unsub();
            }
        });
    }

    async buyModel(modelHash: string, callback: Callback){
        const injector = await web3FromAddress(this.sender)
        const unsub =  await this.api.tx.aiModel.buyModel(
            modelHash
        ).signAndSend(this.sender, {signer: injector.signer}, (result) => {
            console.log(result.status)

            if (result.status.isInBlock) {
                if(result.dispatchError){
                    if(callback) {
                        callback(result.dispatchError.toHuman())
                    }
                    unsub()
                    return
                }

                console.log(`Transaction included at blockHash ${result.status.asInBlock}`);
                if(callback) {
                    callback("inBlock")
                }
            } else if (result.status.isFinalized) {
                console.log(`Transaction finalized at blockHash ${result.status.asFinalized}`);
                if(callback) {
                    callback("finalized")
                }
                unsub();
            }
        });
    }

    async modelList() {

        const modelHashCodec = await this.api.query.aiModel.aiModelHash()

        if(modelHashCodec === undefined){
            throw new Error('storage value not found')
        }

        // @ts-ignore
        const modelHashList: string[] = modelHashCodec.toHuman()

        let result: CreateModelVO[] = []

        for(let hash of modelHashList){
            const model: CreateModelVO = await this.modelDetail(hash)
            result.push(model)
        }

        return result
    }

    async userModelList(address: string): Promise<CreateModelVO[]> {
        const modelHashCodec = await this.api.query.aiModel.userModels(address)

        if(modelHashCodec === undefined){
            throw new Error('storage value not found')
        }

        // @ts-ignore
        const modelHashList: string[] = modelHashCodec.toHuman()

        let result: CreateModelVO[] = []

        for(let hash of modelHashList){
            const model: CreateModelVO = await this.modelDetail(hash)
            result.push(model)
        }

        return result
    }

    async postList(modelHash: string) {
        const postsCodec = await this.api.query.aiModel.modelPost(modelHash)
        if(postsCodec === undefined){
            throw new Error('storage value not found')
        }

        if(!(postsCodec.value instanceof Array)){
            throw new Error('storage type error')
        }

        const result = []
        for(let postCodec of postsCodec.value){
            result.push(this.toCreatePostVO(postCodec))
        }

        return  result
    }

    async nftList() {
        const nft : NFT =  {

        }
        return [nft]
    }

    async modelDetail(modelHash: string) {

        const result = await this.api.query.aiModel.aiModels(modelHash)
        if(result === undefined){
            throw new Error("storage value not found")
        }

        // @ts-ignore
        const imageNames = result.value.images.toHuman()
        const imageLinks = result.value.imageLinks.toHuman()
        const images = []
        for(let i = 0 ; i< imageNames.length; i++){
            images.push({
                image: imageNames[i],
                imageLink: imageLinks[i]
            })
        }
        const model: CreateModelVO = {
            hash: result.value.hash_.toHuman(),
            name: result.value.name.toHuman(),
            link: result.value.link.toHuman(),
            images: images,
            downloadPrice: result.value.downloadPrice.toNumber(),
            comment: result.value.comment.toHuman(),
        }

        return model
    }

    toCreatePostVO = (item: any) => {
        const imageNames = item.images.toHuman()
        const imageLinks = item.imageLinks.toHuman()
        const images = []
        for(let i = 0 ; i< imageNames.length; i++){
            images.push({
                image: imageNames[i],
                imageLink: imageLinks[i]
            })
        }
        const post: CreatePostVO = {
            modelHash: item.modelHash.toHuman(),
            name: item.name.toHuman(),
            images: images,
            comment: item.comment.toHuman(),
        }
        return post
    }
}
