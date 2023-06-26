// 下载 str:下载的内容  name:下载文件的名称  format:下载文件的格式
export const downloadRequest = (str:string,name:string,format:string)=>{
  const url = `data:,${str}`;
  const a = document.createElement('a');
  a.href = url;
  a.download = `${name}.${format}`;
  a.click();
  a.remove();
}