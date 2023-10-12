"use client";

import { ApiUserCourse_CourseType } from "@/utils/types";
import { ReactNode } from "react";

export default function Component({ child, actionFunction, course, user_id }: { child: ReactNode, actionFunction: (...args: any) => void, course: ApiUserCourse_CourseType, user_id: string }) {
    return (
        <div onClick={() => actionFunction(course, user_id)} >
            {child}
        </div>
    )
}