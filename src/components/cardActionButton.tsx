"use client";

import { ReactNode } from "react";

export default function Component({ child, actionFunction, course, user_id }: { child: ReactNode, actionFunction: (...args: any) => void, course: string, user_id: string }) {
    return (
        <div onClick={() => actionFunction(course, user_id)} >
            {child}
        </div>
    )
}