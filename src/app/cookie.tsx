"use client"
import { useRouter } from "next/navigation";
export default function Cookie() {

    const router = useRouter()
    function getCookie(name: string) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop()?.split(";").shift();
    }
    function uuidv4() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }
    function setUserIdCookie(userId: string | undefined) {
        var d = new Date();
        d.setTime(d.getTime() + (400 * 24 * 60 * 60 * 1000)); // 400 days
        var expires = "expires=" + d.toUTCString();
        document.cookie = "user_id=" + userId + "; " + expires + "; path=/";
    }
    if (typeof window !== "undefined") {
        var user_id = getCookie("user_id");
        if (!user_id) {
            user_id = uuidv4();
            router.refresh()
        }
        setUserIdCookie(user_id);
    }

    return <></>
}