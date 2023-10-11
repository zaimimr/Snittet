"use client"
import { grades, pass } from "@/utils/const";
import { setGrade } from "@/utils/serverFunction";
import { ApiUserCourse_CourseType } from "@/utils/types";
import classNames from "classnames";
import React from "react";

const GradePicker = ({ course, user_id }: { course: ApiUserCourse_CourseType, user_id: { value: string } }) => {


    return (
        <div className="flex items-center justify-between space-x-2">
            {course.is_grade ? (
                grades.map(({ grade }) => {
                    const style = (course.grade?.trim() === grade || course.grade === null) ? {
                        "bg-a": grade === "A",
                        "bg-b": grade === "B",
                        "bg-c": grade === "C",
                        "bg-d": grade === "D",
                        "bg-e": grade === "E",
                        "bg-f": grade === "F",
                    } : "bg-default"
                    return (
                        <div key={grade} className="relative">
                            <button
                                onClick={() => setGrade(grade, user_id.value, course.course)}
                                className={classNames(`w-10 h-10 rounded-full cursor-pointer shadow-lg flex items-center justify-center hover:bg-custom-radial`, style)}
                            >
                                <p className="text-white font-semibold">{grade}</p>
                            </button>
                        </div>
                    )
                })
            ) : (
                pass.map(({ grade }) => {
                    const style = (course.grade?.trim() === grade || course.grade) === null ? {
                        "bg-a": grade === "G",
                        "bg-f": grade === "H",
                    } : "bg-default"

                    return (
                        <button
                            key={grade}
                            onClick={() => setGrade(grade, user_id.value, course.course)}
                            className={classNames(`w-full h-10 flex items-center justify-center rounded cursor-pointer shadow-lg hover:bg-custom-radial`, style)}
                        >
                            <p className="text-white font-semibold">{grade === "G" ? "Godkjent" : "Stryk"}</p>
                        </button>
                    )
                })
            )}
        </div >
    );
};

export default GradePicker;
