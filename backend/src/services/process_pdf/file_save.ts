import { BoeModel } from '../../models/boe.model';
import { BoeDocument } from '../../models/boe.model';
import { FileListDocument, FileListModel } from '../../models/file.list.model';

export const saveFilepath = async (
  proposalId: string,
  filepath: string,
  fileType: number
): Promise<FileListDocument> => {
  if (fileType === 0) {
    await FileListModel.deleteMany({});
  }
  const newFile = new FileListModel({ proposalId, filepath, fileType });
  await newFile.save();
  return newFile;
};
