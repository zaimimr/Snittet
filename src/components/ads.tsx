"use client"
import { useEffect } from "react";

const AdSense = ({ adSlot }: { adSlot?: string }) => {
    useEffect(() => {
        try {

            if (window) {
                // @ts-ignore
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
        } catch (err) {
            console.error(err);
        }
    }, []);

    return (
        <ins
            className="adsbygoogle"
            style={{ display: "block", width: "100%", height: "154px" }}
            data-ad-client="ca-pub-7050229813846454" // Replace with your publisher ID
            data-ad-slot={adSlot}
            data-ad-format="fluid"
            data-adtest="on"
            data-full-width-responsive="true"
        ></ins>
    );
};

export default AdSense;