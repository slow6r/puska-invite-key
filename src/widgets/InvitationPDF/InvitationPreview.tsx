import React, { useRef, useState, useEffect, useLayoutEffect } from "react";

interface InvitationPreviewProps {
  name: string;
  date: string;
  time: string;
  phone: string;
  qr1: string;
  qr2: string;
  services: string[];
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  style?: React.CSSProperties;
}

const A4_WIDTH = 595;
const A4_HEIGHT = 842;

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  return `${day}.${month}.${year}`;
}

const InvitationPreview: React.FC<InvitationPreviewProps> = ({
  name,
  date,
  time,
  phone,
  services = [],
  qr1,
  qr2,
  onClick,
  style,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    setTimeout(() => setVisible(true), 10);
  }, []);

  useLayoutEffect(() => {
    function updateScale() {
      if (!containerRef.current) return;
      const parent = containerRef.current.parentElement;
      if (!parent) return;
      const parentW = parent.clientWidth;
      const parentH = parent.clientHeight;
      let newScale = 1;
      if (window.innerWidth <= 768) {
        newScale = Math.min(parentW / A4_WIDTH, parentH / A4_HEIGHT, 1);
      }
      setScale(newScale);
    }
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <>
      <style>{`
        .invitation-appear {
          opacity: 0;
          transform: scale(0.96) translateY(30px);
          transition: opacity 0.7s cubic-bezier(.4,1.6,.64,1), transform 0.7s cubic-bezier(.4,1.6,.64,1);
        }
        .invitation-appear.visible {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
      `}</style>
      <div
        ref={containerRef}
        className={`invitation-appear${visible ? " visible" : ""}`}
        style={{
          width: A4_WIDTH,
          height: A4_HEIGHT,
          position: "relative",
          background: "transparent",
          transform: `scale(${scale})`,
          transformOrigin: "center",
          ...(typeof style === "object" ? style : {}),
        }}
        onClick={onClick}
      >
        <div
          style={{
            background: "#181828",
            position: "relative",
          }}
        >
          {/* Флаги и декоративные элементы */}
          <img
            src="/assets/flag.png"
            alt="flag"
            style={{
              position: "absolute",
              top: -15,
              left: 0,
              width: "100%",
              zIndex: 0,
              transform: "rotate(1.5deg)",
            }}
          />
          <img
            src="/assets/first.png"
            alt="first"
            style={{
              position: "absolute",
              top: 110,
              left: 30,
              width: 90,
              height: 50,
              opacity: 0.85,
              zIndex: 0,
            }}
          />
          <img
            src="/assets/second.png"
            alt="second"
            style={{
              position: "absolute",
              top: 120,
              right: 60,
              width: 60,
              height: 60,
              opacity: 0.8,
              zIndex: 0,
            }}
          />
          <img
            src="/assets/third.png"
            alt="third"
            style={{
              position: "absolute",
              top: 440,
              right: 110,
              width: 40,
              height: 50,
              opacity: 0.8,
              zIndex: 2,
              transform: "rotate(-10deg)",
            }}
          />
          <img
            src="/assets/four.png"
            alt="four"
            style={{
              position: "absolute",
              left: 150,
              bottom: 140,
              width: 40,
              height: 40,
              opacity: 0.8,
              zIndex: 2,
              transform: "scaleX(-1)",
            }}
          />
          {/* Контент */}
          <div
            style={{
              width: "100%",
              height: "100%",
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              position: "relative",
              zIndex: 1,
              paddingLeft: 30,
              paddingRight: 30,
              boxSizing: "border-box",
              fontFamily: "Panton, Arial, sans-serif",
              border: "4px solid #00fff7",
            }}
          >
            {/* Верхняя часть */}
            <div
              style={{
                width: "100%",
                alignItems: "center",
                marginBottom: 1,
                paddingLeft: 10,
                paddingRight: 10,
                marginTop: 130,
                textAlign: "center",
                fontFamily: "Panton, Arial, sans-serif",
              }}
            >
              <div
                style={{
                  background: "#181828",
                  borderRadius: 18,
                  padding: "12px 24px",
                  marginBottom: 12,
                  boxShadow: "0 0 12px 2px #181828",
                  border: "2px solid #00fff7",
                  display: "inline-block",
                }}
              >
                <span
                  style={{
                    fontSize: 32,
                    fontWeight: "bold",
                    color: "#00fff7",
                    letterSpacing: 2,
                    fontFamily: "PantonBold, Panton, Arial, sans-serif",
                  }}
                >
                  ПРИГЛАШЕНИЕ
                </span>
              </div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: "bold",
                  color: "#ff00ea",
                  marginBottom: 2,
                  fontFamily: "PantonBold, Panton, Arial, sans-serif",
                  letterSpacing: 1,
                }}
              >
                {name}
              </div>
            </div>
            {/* Основной текст */}
            <div
              style={{
                width: "100%",
                alignItems: "center",
                marginTop: 10,
                marginBottom: 5,
                textAlign: "center",
                fontFamily: "Panton, Arial, sans-serif",
              }}
            >
              <div
                style={{
                  marginBottom: 10,
                  fontSize: 16,
                  color: "#fff",
                  textShadow: "0 0 4px #00fff7",
                  fontFamily: "Panton, Arial, sans-serif",
                }}
              >
                Приглашаю тебя на свой{" "}
                <span
                  style={{
                    fontWeight: "bold",
                    color: "#ff00ea",
                    textShadow: "0 0 6px #ff00ea",
                    fontFamily: "PantonBold, Panton, Arial, sans-serif",
                  }}
                >
                  День Рождения
                </span>
                ,
              </div>
              <div
                style={{
                  marginBottom: 10,
                  fontSize: 16,
                  color: "#fff",
                  textShadow: "0 0 4px #00fff7",
                  fontFamily: "Panton, Arial, sans-serif",
                }}
              >
                который состоится{" "}
                <span
                  style={{
                    fontWeight: "bold",
                    color: "#ff00ea",
                    textShadow: "0 0 6px #ff00ea",
                    fontFamily: "PantonBold, Panton, Arial, sans-serif",
                  }}
                >
                  {formatDate(date)}
                </span>{" "}
                в{" "}
                <span
                  style={{
                    fontWeight: "bold",
                    color: "#ff00ea",
                    textShadow: "0 0 6px #ff00ea",
                    fontFamily: "PantonBold, Panton, Arial, sans-serif",
                  }}
                >
                  {time}
                </span>
              </div>
            </div>
            {/* Текст перед активностями */}
            <div
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#00fff7",
                textAlign: "center",
                marginBottom: 12,
                marginTop: 12,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                fontFamily: "PantonBold, Panton, Arial, sans-serif",
              }}
            >
              НАС ЖДУТ УВЛЕКАТЕЛЬНЫЕ ПРИКЛЮЧЕНИЯ
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                margin: "4px 0",
                gap: 32,
              }}
            >
              {services.length === 0 ? (
                <span
                  style={{ color: "#ff00ea", fontSize: 13, fontWeight: 600 }}
                >
                  (Услуги не выбраны)
                </span>
              ) : (
                services.map((act, i) => (
                  <div
                    key={i}
                    style={{
                      border: "1.5px dashed #00fff7",
                      borderRadius: 36,
                      width: 72,
                      height: 72,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      background: "rgba(0,255,247,0.07)",
                    }}
                  >
                    <span
                      style={{
                        color: "#00fff7",
                        fontSize: 12,
                        fontWeight: "bold",
                        textAlign: "center",
                        textTransform: "uppercase",
                        lineHeight: 1.1,
                        fontFamily: "PantonBold, Panton, Arial, sans-serif",
                      }}
                    >
                      {act}
                    </span>
                  </div>
                ))
              )}
            </div>
            {/* Блок: три колонки — торт, текст, подарок */}
            <div
              style={{
                width: "100%",
                display: "flex",
                margin: "8px auto 0 auto",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                padding: 6,
                gap: 8,
                height: 220,
              }}
            >
              {/* Левая колонка: торт */}
              <div
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  display: "flex",
                }}
              >
                <img
                  src="/assets/cake.png"
                  alt="cake"
                  style={{
                    width: 140,
                    height: 140,
                    objectFit: "contain",
                    marginBottom: 15,
                  }}
                />
              </div>
              {/* Центральная колонка: текст */}
              <div
                style={{
                  flex: 2,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  minWidth: 0,
                  paddingLeft: 12,
                  paddingRight: 12,
                  height: "100%",
                }}
              >
                <div
                  style={{
                    fontSize: 30,
                    letterSpacing: 2,
                    margin: "4px 0",
                    textAlign: "center",
                    fontWeight: 900,
                    fontFamily: "PantonBold, Panton, Arial, sans-serif",
                    color: "#ff00ea",
                  }}
                >
                  ВСТРЕЧАЕМСЯ В «ПУШКЕ»
                </div>
                <div
                  style={{
                    marginTop: 2,
                    textAlign: "center",
                    fontSize: 12,
                    color: "#fff",
                    fontFamily: "Panton, Arial, sans-serif",
                  }}
                >
                  По всем вопросам: {phone}
                </div>
              </div>
              {/* Правая колонка: подарок */}
              <div
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  display: "flex",
                }}
              >
                <img
                  src="/assets/gift.png"
                  alt="gift"
                  style={{ width: 140, height: 140, objectFit: "contain" }}
                />
              </div>
            </div>
            {/* QR-коды и адрес между ними */}
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
                position: "relative",
                zIndex: 1,
              }}
            >
              <div
                style={{
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    background: "rgba(0,255,247,0.15)",
                    border: "3px solid #00fff7",
                    borderRadius: 14,
                    display: "flex",
                    flexDirection: "column",
                    padding: 10,
                    marginBottom: 2,
                    width: 130,
                    height: 140,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={qr1}
                    alt="qr1"
                    style={{ width: 96, height: 96, borderRadius: 8 }}
                  />
                  <div
                    style={{
                      marginTop: 8,
                      fontSize: 10,
                      color: "#fff",
                      textAlign: "center",
                      fontFamily: "Panton, Arial, sans-serif",
                    }}
                  >
                    pushka.club
                  </div>
                </div>
              </div>
              <div
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    lineHeight: 1.4,
                    color: "#00fff7",
                    textAlign: "center",
                    fontFamily: "Calibri, Arial, sans-serif",
                  }}
                >
                  ТРЦ «Ключевой»
                  <br />
                  ул. Борисовские Пруды, 26
                  <br />
                  ТЕЛ: 8 (926) 048-53-35 или (495) 147-90-52
                </div>
              </div>
              <div
                style={{
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    background: "rgba(255,0,234,0.15)",
                    border: "3px solid #ff00ea",
                    borderRadius: 14,
                    display: "flex",
                    flexDirection: "column",
                    padding: 10,
                    marginBottom: 2,
                    width: 130,
                    height: 140,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={qr2}
                    alt="qr2"
                    style={{ width: 96, height: 96, borderRadius: 8 }}
                  />
                  <div
                    style={{
                      marginTop: 8,
                      fontSize: 10,
                      color: "#fff",
                      textAlign: "center",
                      fontFamily: "Panton, Arial, sans-serif",
                    }}
                  >
                    pushka.moscow
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvitationPreview;
