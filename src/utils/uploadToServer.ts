import { createWriteStream } from "fs";

// 사용법
// import { uploadDefaultPath } from "../server";
// const uploadFileRegex = `${context?.loggedInUser?.id + Date.now()}`;
// 서버local에 저장하는 방법
// avatarUrl = await uploadToServer({
//   uploadFile: avatar,
//   uploadPath: uploadDefaultPath,
//   uploadFileRegex: uploadFileRegex
// });

interface UploadToServerType {
  uploadFile: any;
  uploadPath: string;
  uploadFileRegex: string;
}
const uploadToServer = async ({
  uploadFile,
  uploadPath,
  uploadFileRegex
}: UploadToServerType) => {
  const { filename, createReadStream } = await uploadFile;
  const readStream = createReadStream();

  // 저장되는 파일 이름 지정
  const uploadFileName = uploadFileRegex + filename;

  //   저장경로와 저장되는 파일 이름을 병합한다.
  const mergedUploadPath = uploadPath + "/" + uploadFileName;

  // 저장 경로와 저장되는 파일이름 규칙을 합쳐서 해당 위치에 해당 파일이름으로 저장하도록 설정(with createWritestream)
  const whiteStream = createWriteStream(mergedUploadPath);

  // 저장 경로에 저장하는 작업
  readStream.pipe(whiteStream);
  // 마무리 해줘야함 근데 왜그런지 모르겠지만 모듈 찾을수 없다고 에러남
  // finished(whiteStream);
  const result = `http://localhost:4000/uploads/${uploadFileName}`;
  return result;
};

export default uploadToServer;
