import axios from "axios";
import { db } from "service/firebase";

import { IMinStudy } from "./../utils/types";

export const post = (code: string, name: string) => {
  db.collection("Subjects")
    .doc()
    .set({
      code: code,
      norwegian_name: name,
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error("Error writing document: ", error);
    });
};

export const getStudies = async (keyword: string) => {
  const studies: IMinStudy[] = [];

  await db
    .collection("Subjects")
    .where("code", ">=", keyword)
    .where("code", "<", keyword + "z")
    .orderBy("code", "asc")
    .limit(5)
    .get()
    .then((data) => {
      data.docs.map((doc) => {
        const d = doc.data();
        studies.push({
          code: d.code,
          norwegian_name: d.norwegian_name,
        } as IMinStudy);
      });
    })
    .catch(function (error) {
      // eslint-disable-next-line no-console
      console.log("Error getting document:", error);
    });

  return studies;
};

export const getStudie = (code: string) => {
  return axios.get(`https://grades.no/api/v2/courses/${code}/`);
};
