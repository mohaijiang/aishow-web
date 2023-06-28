export const downloadFile = (url:string,name:string) => {
  const desiredFileName = name; // 你希望的文件名
  fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        // 创建一个虚拟的链接元素
        let downloadElement = document.createElement("a");
        let href = window.URL.createObjectURL(blob);
        downloadElement.href = href;
        downloadElement.download = desiredFileName;
        document.body.appendChild(downloadElement);
        downloadElement.click();
        document.body.removeChild(downloadElement);
        window.URL.revokeObjectURL(href);
      })
      .catch((error) => {
        console.error('Download failed：', error);
      });
}