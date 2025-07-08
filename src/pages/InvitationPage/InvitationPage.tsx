import React, { useState, useEffect } from "react";
import InvitationPDF from "@/widgets/InvitationPDF/InvitationPDF";
import InvitationPreview from "@/widgets/InvitationPDF/InvitationPreview";
import styles from "./InvitationPage.module.scss";
import { pdf } from "@react-pdf/renderer";
import JSZip from "jszip";
import Loader from "@/shared/components/Loader/Loader";
import QRCode from "qrcode";

interface InvitationPageProps {
  name: string;
  date: string;
  time: string;
  phone: string;
  onClose: () => void;
  guests?: { name: string }[];
  services: string[];
}

interface GuestWithQR {
  name: string;
  qr1: string;
  qr2: string;
}

const InvitationPage: React.FC<InvitationPageProps> = ({
  name,
  date,
  time,
  phone,
  onClose,
  guests = [{ name }],
  services, // добавлено
}) => {
  const [zipLoading, setZipLoading] = useState(false);
  const [pdfLoaded, setPdfLoaded] = useState(false);
  const [guestsWithQR, setGuestsWithQR] = useState<GuestWithQR[] | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const generateAllQR = async () => {
      // const qr1 = await QRCode.toDataURL("https://drklen.pushka.club");
      // https://drkey.pushka.club/

      const qr1 = await QRCode.toDataURL("https://drkey.pushka.club");

      const qr2 = await QRCode.toDataURL("https://vk.com/pushka_moscow");
      const guestsQR = guests
        .filter((g) => g.name && g.name.trim())
        .map((g) => ({ name: g.name, qr1, qr2 }));
      setGuestsWithQR(guestsQR);
      setPdfLoaded(true); // Ставим true только после генерации QR и заполнения гостей
    };
    generateAllQR();
  }, [guests]);
  // ...existing code...

  const handleShareOrDownloadPDF = async () => {
    if (!mainGuest) return;
    const blob = await pdf(
      <InvitationPDF
        name={mainGuest.name}
        services={services}
        date={date}
        time={time}
        phone={phone}
        qr1={mainGuest.qr1}
        qr2={mainGuest.qr2}
      />
    ).toBlob();
    const file = new File(
      [blob],
      `${
        mainGuest.name
          ? mainGuest.name.replace(/[^a-zA-Zа-яА-Я0-9_-]/g, "_")
          : "invite"
      }.pdf`,
      { type: "application/pdf" }
    );
    if (
      navigator.share &&
      navigator.canShare &&
      navigator.canShare({ files: [file] })
    ) {
      try {
        await navigator.share({
          files: [file],
          title: "Приглашение",
          text: "Скачай и поделись PDF",
        });
        return;
      } catch {
        // пользователь отменил или не поддерживается
      }
    }
    // fallback: обычное скачивание
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  };

  const handleDownloadAllPDF = async () => {
    if (!guestsWithQR) return;
    setZipLoading(true);
    const zip = new JSZip();
    for (let i = 0; i < guestsWithQR.length; i++) {
      const guest = guestsWithQR[i];
      const blob = await pdf(
        <InvitationPDF
          name={guest.name}
          date={date}
          time={time}
          phone={phone}
          qr1={guest.qr1}
          qr2={guest.qr2}
          services={services} // обязательно!
        />
      ).toBlob();
      zip.file(`${guest.name || `guest${i + 1}`}.pdf`, blob);
    }
    const content = await zip.generateAsync({ type: "blob" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(content);
    a.download = "invitations.zip";
    a.click();
    setZipLoading(false);
  };

  if (!pdfLoaded || !guestsWithQR) {
    return (
      <div className={styles.overlay}>
        <Loader />
      </div>
    );
  }

  const mainGuest = guestsWithQR[0];

  return (
    <div className={styles.overlay}>
      <button
        className={`${styles.closeBtn} ${pdfLoaded ? styles.loaded : ""}`}
        onClick={onClose}
        aria-label="Закрыть"
      >
        <span className={styles.closeIcon}></span>
      </button>
      <div
        className={`${styles.centeredContent} ${
          pdfLoaded ? styles.loaded : ""
        }`}
      >
        <div className={styles.pdfContainer}>
          <InvitationPreview
            name={mainGuest.name}
            date={date}
            time={time}
            phone={phone}
            qr1={mainGuest.qr1}
            qr2={mainGuest.qr2}
            services={services}
            onClick={() => setIsFullscreen(true)}
            style={{ cursor: "zoom-in" }}
          />
        </div>

        {guestsWithQR.length > 1 ? (
          <button
            className={styles.downloadBtn}
            onClick={handleDownloadAllPDF}
            disabled={zipLoading}
          >
            {zipLoading ? "Генерация архива..." : "Скачать все PDF (архив)"}
          </button>
        ) : (
          mainGuest &&
          mainGuest.name && (
            <>
              <button
                className={styles.downloadBtn}
                onClick={handleShareOrDownloadPDF}
              >
                Поделиться или скачать PDF
              </button>
              <div
                style={{
                  color: "#aaa",
                  fontSize: 13,
                  marginTop: 8,
                  textAlign: "center",
                }}
              >
                Если не удаётся отправить PDF напрямую, скачайте файл и
                отправьте вручную через мессенджер или почту.
                <br />
                На iPhone: после скачивания выберите “Сохранить в Файлы”, затем
                отправьте PDF через нужное приложение.
              </div>
            </>
          )
        )}
      </div>
      {/* Модальное окно для полноэкранного просмотра */}
      {isFullscreen && (
        <div
          style={{
            position: "fixed",
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.95)",
            zIndex: 2000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "auto",
            flexDirection: "column",
          }}
        >
          <button
            className={styles.closeBtn + " " + styles.loaded}
            onClick={() => setIsFullscreen(false)}
            aria-label="Закрыть полноэкранный просмотр"
            style={{ zIndex: 2100 }}
          >
            <span className={styles.closeIcon}></span>
          </button>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100vw",
              height: "100vh",
              overflow: "auto",
            }}
          >
            <div
              style={{
                width: 595, // A4 width в px
                height: 842, // A4 height в px
                transform: "scale(1.5)", // увеличиваем только визуально
                transformOrigin: "center center",
                transition: "transform 0.3s",
                boxShadow: "0 0 32px #000",
                background: "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <InvitationPreview
                name={mainGuest.name}
                date={date}
                time={time}
                phone={phone}
                services={services}
                qr1={mainGuest.qr1}
                qr2={mainGuest.qr2}
                style={{ cursor: "zoom-out", width: "100%", height: "auto" }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvitationPage;
