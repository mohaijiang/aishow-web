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
    // 图片名（图片hash)
    image: string
    // 图片地址
    imageLink: string
}

export interface CreatePostVO {
    // 模型hash
    modelHash: string
    // uuid
    uuid: string
    // 主题名
    name: string
    // 图片列表
    images: ImageVO[]
    // markdown 备注
    comment: string
}

export interface NFT {

    collectionId: number,
    itemId: number,
    post: CreatePostVO,
    itemUuid: string,
    itemLink: string,
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
    // nft 创建collection
    nftCreateCollection(modelHash: string): Promise<number>
    //nft mint
    nftMint(modelHash: string,postId: string, uuid: string): Promise<void>
    // userNFT
    userNFT(address: string): Promise<NFT[]>
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

    substrateListener = ({ status, events }) => {
        if (status.isInBlock || status.isFinalized) {
            events
                // find/filter for failed events
                .filter(({ event }) =>
                    this.api.events.system.ExtrinsicFailed.is(event)
                )
                // we know that data for system.ExtrinsicFailed is
                // (DispatchError, DispatchInfo)
                .forEach(({ event: { data: [error, info] } }) => {
                    if (error.isModule) {
                        // for module errors, we have the section indexed, lookup
                        const decoded = this.api.registry.findMetaError(error.asModule);
                        const { docs, method, section } = decoded;

                        console.log(`${section}.${method}: ${docs.join(' ')}`);
                    } else {
                        // Other, CannotLookup, BadOrigin, no extra info
                        console.log(error.toString());
                    }
                });
        }
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
                    this.substrateListener(result)
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
            createPostVO.uuid,
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
                this.substrateListener(result)
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
                this.substrateListener(result)
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
        const postsCodec = await this.api.query.aiModel.modelPost.entries(modelHash)
        if(postsCodec === undefined){
            throw new Error('storage value not found')
        }


        const result = []
        for(let postCodec of postsCodec){
            const keys = postCodec[0].toHuman()
            result.push(this.toCreatePostVO(postCodec[1].toHuman()))
        }

        return  result
    }

    async nftList(): Promise<NFT[]> {

        const result: NFT[] = []
        // 先查询所有collection
        const nftItem = await this.api.query.nfts.itemMetadataOf.entries()

        for(let item of nftItem ){
            // @ts-ignore
            let storageKey = item[0].toHuman()
            // @ts-ignore
            const collectionId = storageKey[0]
            // @ts-ignore
            const itemId = storageKey[1]
            const collectionCodec = await this.api.query.nfts.collectionMetadataOf(collectionId)
            // @ts-ignore
            const modelHash = collectionCodec.toHuman().data
            // @ts-ignore
            const postAndImageUUid = item[1].toHuman().data
            const postUuid = postAndImageUUid.split('_')[0]
            const imageUuid = postAndImageUUid.split('_')[1]
            const post = await this.getCreatePostVO(modelHash,postUuid)
            const mintedImage = post.images.find(t => t.image = imageUuid)
            if(mintedImage === undefined){
                continue
            }
            result.push({
                collectionId: collectionId,
                itemId: itemId,
                post: post,
                itemUuid: mintedImage.image,
                itemLink: mintedImage.imageLink
            })
        }
        return result
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
        const imageNames = item.images
        const imageLinks = item.imageLinks
        const images = []
        for(let i = 0 ; i< imageNames.length; i++){
            images.push({
                image: imageNames[i],
                imageLink: imageLinks[i]
            })
        }
        const post: CreatePostVO = {
            modelHash: item.modelHash,
            uuid: item.uuid,
            name: item.name,
            images: images,
            comment: item.comment,
        }
        return post
    }

    async getCreatePostVO(modelHash: string, uuid: string): Promise<CreatePostVO>{

        const codec = await this.api.query.aiModel.modelPost(modelHash,uuid)

        const vo = codec.toHuman()
        const imageNames = vo.images
        const imageLinks = vo.imageLinks
        const images = []
        for(let i = 0 ; i< imageNames.length; i++){
            images.push({
                image: imageNames[i],
                imageLink: imageLinks[i]
            })
        }
        return {
            modelHash: modelHash,
            uuid: vo.uuid,
            name: vo.name,
            images: images,
            comment: vo.comment,
        }
    }

    async nftCreateCollection(modelHash: string) {
        const injector = await web3FromAddress(this.sender)
        const collectionIdCodec = await this.api.query.nfts.nextCollectionId()
        let collectionId = 0
        if(collectionIdCodec.isSome){
            collectionId = collectionIdCodec.value.toNumber()
        }

        const txs = [
            this.api.tx.nfts.create(
            {Id: this.sender},
            {
                settings: `${collectionId}`,
                maxSupply: null,
                mintSettings: {
                    defaultItemSettings: "0",
                    endBlock: null,
                    mintType: "Issuer",
                    price: null,
                    startBlock: null,
                }
            },
        ),
            this.api.tx.nfts.setCollectionMetadata(
                collectionId,modelHash
            )
        ]

        const unsub =  await this.api.tx.utility.batch(txs).signAndSend(this.sender, {signer: injector.signer}, (result) => {
            console.log(result.status)
            if (result.status.isInBlock) {
                console.log(`Transaction included at blockHash ${result.status.asInBlock}`);
                this.substrateListener(result)
            } else if (result.status.isFinalized) {
                console.log(`Transaction finalized at blockHash ${result.status.asFinalized}`);
                unsub();
            }
        });

        return collectionId
    }

    async nftMint(modelHash: string, postId: string, uuid: string): Promise<void> {
        const collectionId = await this.nftGetCollectionId(modelHash)
        // 查询item 数量
        const collectionCodec = await this.api.query.nfts.collection(collectionId)
        if(collectionCodec === undefined){
            throw new Error("storage not found")
        }
        const collection = collectionCodec.toHuman()
        const itemNum = parseInt(collection.items)
        const injector = await web3FromAddress(this.sender)

        const txs = [
            this.api.tx.nfts.mint(
                collectionId,
                itemNum,
                {Id: this.sender},
                null
            ),
            this.api.tx.nfts.setMetadata(
                collectionId,
                itemNum,
                `${postId}_${uuid}`
            )
        ]

        const unsub =  await this.api.tx.utility.batch(txs).signAndSend(this.sender, {signer: injector.signer}, (result) => {
            console.log(result.status)
            if (result.status.isInBlock) {
                console.log(`Transaction included at blockHash ${result.status.asInBlock}`);
                this.substrateListener(result)
            } else if (result.status.isFinalized) {
                console.log(`Transaction finalized at blockHash ${result.status.asFinalized}`);
                this.substrateListener(result)
                unsub();
            }
        });
    }

    async nftGetCollectionId(modelHash: string): Promise<number> {
        const result = await this.api.query.nfts.collectionMetadataOf.entries()

        for(let item of result){
            if(item.length < 2 ){
                continue
            }
            // @ts-ignore
            if(item[1].toHuman().data === modelHash && item[0]){
                const numArr = item[0].toHuman()
                if(numArr instanceof Array){
                    // @ts-ignore
                    return parseInt(numArr[0])
                }
            }
        }
        throw new Error('storage not found')
    }

    async nftSetCollectionMetadata(collectionId: number, modelHash: string): Promise<void> {
        const injector = await web3FromAddress(this.sender)
        const unsub =  await this.api.tx.nfts.setCollectionMetadata(
            collectionId,modelHash
        ).signAndSend(this.sender, {signer: injector.signer}, this.substrateListener);
    }

    async userNFT(address: string): Promise<NFT[]> {

        const result:NFT[] = []
        const collectionAccountCodec = await this.api.query.nfts.collectionAccount.entries(address)

        for(let item of collectionAccountCodec){
            const keys = item[0].toHuman()
            const collectionId = keys[1]

            // 查询此collectionId 下有多少NFT
            const nfsCodec = await this.api.query.nft.account.entries(address,collectionId)

            for(let account of nfsCodec){
                const accountKeys = item[0].toHuman()
                const itemId = accountKeys[2]
                const nft = await this.getNFT(collectionId,itemId)
                result.push(nft)
            }
            debugger
        }

        return result
    }

    async getNFT(collectionId: number, itemId: number): Promise<NFT>{
        const modelHashCodec = await this.api.query.nfts.collectionMetadataOf(collectionId)
        const modelHash = modelHashCodec.toHuman().data
        const postCodec = await this.api.query.nfts.itemMetadataOf(collectionId,itemId)
        const postAndImageUUID = postCodec.toHuman().data

        const postUuid = postAndImageUUID.split('_')[0]
        const imageUuid = postAndImageUUID.split('_')[1]
        const post = await this.getCreatePostVO(modelHash,postUuid)
        const mintedImage = post.images.find(t => t.image = imageUuid)

        if(mintedImage === undefined){
            throw new Error("stroage value error")
        }

        return {
            collectionId: collectionId,
            itemId: itemId,
            post: post,
            itemUuid: mintedImage.image,
            itemLink: mintedImage.imageLink
        }
    }
}
