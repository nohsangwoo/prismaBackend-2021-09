import AWS from "aws-sdk";

AWS.config.update({
  credentials: {
    accessKeyId: String(process.env.AWS_KEY),
    secretAccessKey: String(process.env.AWS_SECRET_KEY)
  }
});

export const uploadToS3 = async (
  file: any,
  userId: number,
  folderName: string
) => {
  // 파일에서 파일이름과, createReadStream을 추출하는 과정을 비동기 처리한다
  // fix bug 배열형식으로 반환되는점 수정
  const { filename, createReadStream } = await file;
  const readStream = createReadStream();

  const objectName = `${folderName}/${userId}-${Date.now()}-${filename}`;

  const { Location } = await new AWS.S3()
    .upload({
      // 버킷이름
      Bucket: "prisma-upload",
      // 저장되는 파일이름
      Key: objectName,
      // 파일의 보호 규칙같은거 public-read는 말그대로 아무나 읽을수 있음
      ACL: "public-read",
      // 저장되는 파일 stream
      Body: readStream
    })
    .promise();

  return Location;
};
