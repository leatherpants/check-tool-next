'use client';

import { Html5QrcodeScanner } from "html5-qrcode";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const scannerContainerId = "html5qr-code-full-region";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const html5QrcodeScanner = new Html5QrcodeScanner(scannerContainerId, { fps: 10, qrbox: 250 }, false);
    async function qrCodeSuccessCallback(decodedText: string) {
      html5QrcodeScanner.pause();
      router.replace(`/checks/add/qrcode/success?${decodedText}`);
    }

    function qrCodeErrorCallback() { }

    html5QrcodeScanner.render(qrCodeSuccessCallback, qrCodeErrorCallback);

    // cleanup function when component will unmount
    return () => {
      html5QrcodeScanner.clear().catch(error => {
        console.error("Failed to clear html5QrcodeScanner. ", error);
      });
    };
  }, []);

  return (<>
    <div id={scannerContainerId} />
  </>);
}