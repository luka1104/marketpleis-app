import { supabaseClient } from "../../../lib/supabase";
import { uuid } from '@supabase/supabase-js/src/lib/helpers'

type UploadStorageArgs = {
  fileList: FileList;
  bucketName: any;
};

type ReturnUploadStorage = {
  pathname: string | null;
};

type GetStorageFileURLBody = {
  bucketName: any;
  pathName: string;
};

export const uploadStorage = async ({
  fileList,
  bucketName,
}: UploadStorageArgs): Promise<ReturnUploadStorage> => {
  try {
    const file = fileList[0];
    const pathName = `${uuid()}`;
    const { data, error } = await supabaseClient.storage
      .from(bucketName)
      .upload(pathName, file);
    if (error) throw error;
    return {
			pathname: data?.Key.substring(bucketName.length + 1) ?? null
		}
	} catch (error) {
		console.error({ error });
    return { pathname: null };
  }
};

export const getStorageFileURL = async ({
	bucketName,
	pathName
}: GetStorageFileURLBody): Promise<string | undefined> => {
  try {
    const { data, error } = await supabaseClient.storage.from(bucketName).download(pathName);
    if (error) throw error;
    return URL.createObjectURL(data);　// ファイルを参照するための一時的なURLを作成
  } catch (error) {
    console.error({ error });
  }
};
