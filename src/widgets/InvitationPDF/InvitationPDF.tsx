import React from "react";
import { Page, Text, View, Document, Font, Image } from "@react-pdf/renderer";
import styles from "./InvitationPDF.styles";

// Подключаем фирменные шрифты через абсолютные пути (public)
Font.register({
  family: "Panton",
  src: "/assets/fonts/Panton-Trial-Regular.ttf",
});
Font.register({
  family: "PantonBold",
  src: "/assets/fonts/Panton-Trial-Bold.ttf",
});
Font.register({
  family: "Calibri",
  src: "/assets/fonts/calibri-regular.ttf",
});
Font.register({
  family: "CalibriItalic",
  src: "/assets/fonts/calibri-italic.ttf",
});

interface InvitationPDFProps {
  name: string;
  date: string;
  time: string;
  phone: string;
  services: string[]; // добавлено
  qr1: string;
  qr2: string;
}

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  return `${day}.${month}.${year}`;
}

const InvitationPDF: React.FC<InvitationPDFProps> = ({
  name,
  date,
  time,
  services = [],
  phone,
  qr1,
  qr2,
}) => {
  return (
    <Document>
      <Page
        size="A4"
        style={{
          ...styles.page,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Флаги — абсолютный фон в самом верху */}
        <Image
          src={"/assets/flag.png"}
          style={{
            position: "absolute",
            top: -25,
            left: 0,
            width: "100%", // всегда на всю ширину, не обрезается
            zIndex: 0,
          }}
        />
        {/* Декоративные элементы (ленты) */}
        <Image
          src={"/assets/first.png"}
          style={{
            position: "absolute",
            top: 110, // опущено ниже
            left: 30,
            width: 90,
            height: 50,
            opacity: 0.85,
            zIndex: 0,
          }}
        />
        <Image
          src={"/assets/second.png"}
          style={{
            position: "absolute",
            top: 120, // опущено ниже
            right: 60,
            width: 60,
            height: 60,
            opacity: 0.8,
            zIndex: 0,
          }}
        />
        <Image
          src={"/assets/third.png"}
          style={{
            position: "absolute",
            top: 440, // чуть выше подарка, уменьшено
            right: 110,
            width: 40,
            height: 50,
            opacity: 0.8,
            zIndex: 2,
            transform: "rotate(-10deg)",
          }}
        />
        {/* Логотип по центру над заголовком */}
        {/* <Image
        src={logobg}
        style={{
          width: 64,
          height: 64,
          marginBottom: 8,
          marginTop: 8,
          alignSelf: "flex-end",
        }}
      /> */}
        {/* Контейнер для равномерного распределения */}
        <View
          style={{
            width: "100%",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Верхняя часть */}
          <View
            style={{
              width: "100%",
              alignItems: "center",
              marginBottom: 1,
              marginTop: 86,
            }}
          >
            <View style={styles.invitationTitleBox}>
              <Text style={styles.title}>ПРИГЛАШЕНИЕ</Text>
            </View>
            <Text
              style={{
                fontSize: 28,
                fontWeight: "bold",
                color: "#ff00ea",
                textAlign: "center",
                marginBottom: 2,
                fontFamily: "PantonBold",
                letterSpacing: 1,
              }}
            >
              {name}
            </Text>
          </View>
          {/* Основной текст */}
          <View
            style={{
              width: "100%",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text style={styles.paragraph}>
              Приглашаю тебя на свой{" "}
              <Text style={styles.bold}>День Рождения</Text>,
            </Text>
            <Text style={styles.paragraph}>
              который состоится{" "}
              <Text style={styles.bold}>{formatDate(date)}</Text> в{" "}
              <Text style={styles.bold}>{time}</Text>
            </Text>
          </View>
          {/* Текст перед активностями */}
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "#00fff7",
              textAlign: "center",
              marginBottom: 6,
              marginTop: 12, // увеличен отступ сверху
              letterSpacing: 1.5,
              textTransform: "uppercase",
              fontFamily: "PantonBold",
            }}
          >
            НАС ЖДУТ УВЛЕКАТЕЛЬНЫЕ ПРИКЛЮЧЕНИЯ
          </Text>
          {services.length === 0 ? (
            <Text
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                margin: "4px 0",
                gap: 32,
              }}
            >
              (Услуги не выбраны)
            </Text>
          ) : (
            <View
              style={{
                flexDirection: "row", // вот это главное!
                justifyContent: "center",
                alignItems: "center",
                marginVertical: 4,
                display: "flex",
                gap: 32,
              }}
            >
              {services.length === 0 ? (
                <Text
                  style={{
                    color: "#ff00ea",
                    fontSize: 13,
                    fontFamily: "PantonBold",
                  }}
                >
                  (Услуги не выбраны)
                </Text>
              ) : (
                services.map((act, i) => (
                  <View
                    key={i}
                    style={{
                      borderWidth: 1.5,
                      borderColor: "#00fff7",
                      borderStyle: "dashed",
                      borderRadius: 36,
                      width: 72,
                      height: 72,
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                      marginHorizontal: 0,
                      backgroundColor: "rgba(0,255,247,0.07)",
                    }}
                  >
                    <Text
                      style={{
                        color: "#00fff7",
                        fontSize: 12,
                        fontFamily: "PantonBold",
                        textAlign: "center",
                        textTransform: "uppercase",
                        lineHeight: 1.1,
                      }}
                    >
                      {act}
                    </Text>
                  </View>
                ))
              )}
            </View>
          )}
          {/* Блок: три колонки — торт, текст, подарок */}
          <View
            style={{
              width: "100%",
              maxWidth: 600,
              display: "flex",
              marginLeft: "auto",
              marginRight: "auto",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 8,
              padding: 6,
              gap: 8,
              height: 220, // увеличенная высота
            }}
          >
            {/* Левая колонка: торт */}
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Image
                src={"/assets/cake.png"}
                style={{
                  width: 140,
                  height: 140,
                  objectFit: "contain",
                  marginBottom: 15,
                }}
              />
            </View>
            {/* Центральная колонка: текст */}
            <View
              style={{
                flex: 2,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minWidth: 0,
                paddingLeft: 12,
                paddingRight: 12,
                height: "100%",
              }}
            >
              <Text
                style={[
                  styles.meetup,
                  {
                    fontSize: 30,
                    letterSpacing: 2,
                    marginVertical: 4, // уменьшен отступ
                    textAlign: "center",
                    fontWeight: 900,
                    fontFamily: "PantonBold",
                  },
                ]}
              >
                ВСТРЕЧАЕМСЯ В «ПУШКЕ»
              </Text>
              <Text
                style={[styles.contact, { marginTop: 2, textAlign: "center" }]}
              >
                По всем вопросам: {phone}
              </Text>
            </View>
            {/* Правая колонка: подарок */}
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Image
                src={"/assets/gift.png"}
                style={{ width: 140, height: 140, objectFit: "contain" }}
              />
            </View>
          </View>
          {/* QR-коды и адрес между ними (старая версия) */}
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-end",
              minHeight: 90,
              position: "relative",
              zIndex: 1,
            }}
          >
            <View style={{ alignItems: "center" }}>
              <View
                style={{
                  backgroundColor: "rgba(0,255,247,0.15)",
                  borderWidth: 3,
                  borderColor: "#00fff7",
                  borderStyle: "solid",
                  borderRadius: 14,
                  padding: 10,
                  marginBottom: 2,
                  width: 130,
                  height: 140,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  src={qr1}
                  style={{ width: 96, height: 96, borderRadius: 8 }}
                />
                <Text style={styles.qrLabel}>pushka.club</Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                position: "relative",
              }}
            >
              <Text
                style={[
                  styles.footer,
                  {
                    fontSize: 13,
                    lineHeight: 1.4,
                    marginBottom: 25,
                  },
                ]}
              >
                ТРЦ «Ключевой»{"\n"}
                ул. Борисовские Пруды, 26{"\n"}ТЕЛ: 8 (926) 048-53-35 или (495)
                147-90-52
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <View
                style={{
                  backgroundColor: "rgba(255,0,234,0.15)",
                  borderWidth: 3,
                  borderColor: "#ff00ea",
                  borderStyle: "solid",
                  borderRadius: 14,
                  padding: 10,
                  marginBottom: 2,
                  width: 130,
                  height: 140,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  src={qr2}
                  style={{ width: 96, height: 96, borderRadius: 8 }}
                />
                <Text style={styles.qrLabel}>pushka.moscow</Text>
              </View>
            </View>
          </View>
          <Image
            src={"/assets/four.png"}
            style={{
              position: "absolute",
              left: 150, // чуть правее первого qr-кода (qr1)
              bottom: 140, // чуть ниже, чем было ранее
              width: 40,
              height: 40,
              opacity: 0.8,
              zIndex: 2,
              transform: "scaleX(-1)", // отразить по горизонтали
            }}
          />
        </View>
      </Page>
    </Document>
  );
};

export default InvitationPDF;
