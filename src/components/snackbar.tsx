import classNames from "classnames"
import { cookies } from "next/headers"
import SnackbarActionButton from "./snackbarActionButton"

export default function Snackbar({ status = "success", message = "Lorem Ipsum", id }: { id?: number, status: "success" | "warning" | "error" | "info", message: string }) {
    const bgColor = status === "success" ? "bg-a" : status === "error" ? "bg-f" : status === "warning" ? "bg-e" : "bg-c"

    async function readToast() {
        "use server"
        const cookieStore = cookies()
        if (cookieStore.has("read_message_toast")) {
            const read_message_toast = cookieStore.get("read_message_toast")?.value
            cookieStore.set("read_message_toast", `${read_message_toast}-${id}`)
        } else {
            cookieStore.set("read_message_toast", `${id}`)
        }
    }

    return (
        <div id="toast" className={classNames("flex items-center gap-4 w-full max-w-md p-4 text-white rounded-lg shadow ", bgColor)} role="alert">
            {status === "success" && success()}
            {status === "warning" && warning()}
            {status === "error" && error()}
            {status === "info" && info()}
            <p>{message}</p>
            <SnackbarActionButton action={readToast} />
        </div>
    )
}

function success() {
    return (
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg ">
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span className="sr-only">Check icon</span>
        </div>
    )
}
function error() {
    return (
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg ">
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
            </svg>
            <span className="sr-only">Error icon</span>
        </div>
    )
}
function warning() {
    return (
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg ">
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
            </svg>
            <span className="sr-only">Warning icon</span>
        </div>)
}
function info() {
    return (
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-orange-100 rounded-lg ">
            <svg className="w-5 h-5" transform="rotate(180)" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
            </svg>
            <span className="sr-only">Warning icon</span>
        </div>)
}