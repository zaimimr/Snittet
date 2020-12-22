import React from "react";
import { db } from "service/firebase";
import axios from "axios";

export const post = (code:any, name:any) => {
  db.collection("Subjects")
    .doc()
    .set({
      code: code,
      norwegian_name: name,
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
};

export const getStudies = (keyword: string) => {
  const studies: any = [];

  return db
    .collection("Subjects")
    .where('code', ">=", keyword)
    .where('code', "<", keyword +`z`)
    .orderBy("code", "asc")
    .limit(5)
    .get()
    .then((data) => {
      data.docs.map((doc) => {
        studies.push(doc.data())
      });
    })
    .then(()=>studies)
    .catch(function (error) {
      console.log("Error getting document:", error);
    });
};

export const getStudie = (code: string) => {
  return axios.get(`https://grades.no/api/v2/courses/${code}/`)
}
