import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import styles from "./FormPage.module.scss";
import InvitationPage from "@/pages/InvitationPage/InvitationPage";
import Loader from "@/shared/components/Loader/Loader";
import NeonParticles from "@/shared/components/NeonParticles";
import NeonBorder from "@/shared/components/NeonBorder";
import clsx from "clsx";
import FloatingBalloons from "@/shared/components/FloatingBalloons/FloatingBalloons";

export default function FormPage() {
  const [form, setForm] = useState({
    date: "",
    time: "",
    phone: "",
    services: [] as string[],
  });
  const [guests, setGuests] = useState([{ name: "" }]);
  const [loading, setLoading] = useState(false);
  const [showInvitation, setShowInvitation] = useState(false);

  const SERVICES = ["АНИМАТОР", "КВЕСТ", "ШОУ", "ЛАЗЕРТАГ", "МАСТЕР-\nКЛАСС"];

  const handleServiceToggle = (service: string) => {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGuestChange = (i: number, value: string) => {
    const newGuests = [...guests];
    newGuests[i].name = value;
    setGuests(newGuests);
  };

  const addGuest = () => {
    setGuests([...guests, { name: "" }]);
  };

  const handleCreateInvitation = () => {
    setLoading(true);
    setShowInvitation(false);
    setTimeout(() => {
      setLoading(false);
      setShowInvitation(true);
    }, 2000);
  };

  return (
    <div className={styles.root}>
      <FloatingBalloons paused={showInvitation} />
      <Box className={styles.formpageRoot}>
        <NeonParticles />
        <div
          className={clsx(
            styles.formpageScroll,
            guests.length === 1 && styles.formpageScrollCentered
          )}
        >
          <div
            className={clsx(
              styles.formpageFlexRow,
              guests.length === 1 && styles.formpageFlexRowCentered
            )}
          >
            <NeonBorder className={styles.formpageForm}>
              <Typography variant="h4" mb={1} align="center">
                Создание приглашение
              </Typography>
              <Typography
                variant="body1"
                mb={1}
                align="center"
                sx={{ color: "rgba(255, 255, 255, 0.8)" }}
              >
                Заполните данные для создания персонального приглашения
              </Typography>

              <Box mb={2}>
                <Typography
                  variant="subtitle1"
                  sx={{ color: "#00fff7", fontWeight: 600, mb: 1 }}
                  align="center"
                >
                  Оплаченные услуги:
                </Typography>
                <Box
                  display="flex"
                  flexWrap="wrap"
                  gap={1}
                  justifyContent="center"
                >
                  {SERVICES.map((service) => (
                    <Button
                      key={service}
                      variant={
                        form.services.includes(service)
                          ? "contained"
                          : "outlined"
                      }
                      color={
                        form.services.includes(service)
                          ? "secondary"
                          : "inherit"
                      }
                      onClick={() => handleServiceToggle(service)}
                      sx={{
                        minWidth: 90,
                        fontSize: 13,
                        fontWeight: 600,
                        borderRadius: 4,
                        px: 2,
                        py: 1,
                        background: form.services.includes(service)
                          ? "linear-gradient(90deg,#00fff7 0%,#ff00ea 100%)"
                          : "rgba(255,255,255,0.03)",
                        color: form.services.includes(service)
                          ? "#222"
                          : "#00fff7",
                        borderColor: "#00fff7",
                        boxShadow: form.services.includes(service)
                          ? "0 0 8px #00fff7, 0 0 16px #ff00ea"
                          : "none",
                        textTransform: "uppercase",
                        whiteSpace: "pre-line",
                        "&:hover": {
                          background: form.services.includes(service)
                            ? "linear-gradient(90deg,#00fff7 0%,#ff00ea 100%)"
                            : "rgba(0,255,247,0.08)",
                        },
                      }}
                    >
                      {service}
                    </Button>
                  ))}
                </Box>
              </Box>

              <TextField
                label="Дата"
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                required
                inputProps={{ style: { color: "#fff" } }}
              />
              <TextField
                label="Время"
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                required
                inputProps={{ style: { color: "#fff" } }}
              />
              {guests.map((guest, i) => (
                <TextField
                  key={i}
                  label={`Имя гостя${guests.length > 1 ? ` #${i + 1}` : ""}`}
                  value={guest.name}
                  onChange={(e) => handleGuestChange(i, e.target.value)}
                  fullWidth
                  margin="normal"
                  required
                />
              ))}
              <Box display="flex" justifyContent="flex-end" mb={2}>
                <Button
                  startIcon={<AddIcon />}
                  onClick={addGuest}
                  variant="text"
                  color="primary"
                  sx={{ color: "#c084fc" }}
                >
                  Добавить ещё
                </Button>
              </Box>
              <TextField
                label="Контактный телефон"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <Button
                type="button"
                variant="text"
                color="inherit"
                sx={{
                  mt: 0.5, // минимальный отступ сверху
                  mb: 0.5, // минимальный отступ снизу
                  color: "rgba(255, 255, 255, 0.4)",
                  fontSize: "0.82rem",
                  textTransform: "none",
                  px: 1.5,
                  py: 0.5,
                  minWidth: 0,
                  display: "block",
                  mx: "auto",
                  "&:hover": {
                    color: "rgba(255, 255, 255, 0.6)",
                    background: "rgba(255, 255, 255, 0.05)",
                  },
                }}
                onClick={() => {
                  setForm({
                    date: "",
                    time: "",
                    phone: "",
                    services: [] as string[],
                  });
                  setGuests([{ name: "" }]);
                }}
              >
                Сбросить форму
              </Button>
              {!loading ? (
                <Button
                  type="button"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  sx={{ mt: 0, fontWeight: 600 }} // убрать отступ сверху, сделать текст жирнее
                  onClick={handleCreateInvitation}
                >
                  Создать приглашение
                </Button>
              ) : (
                <div
                  style={{
                    height: "56px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Loader />
                </div>
              )}
            </NeonBorder>
          </div>
        </div>

        {showInvitation && (
          <InvitationPage
            guests={guests}
            name={guests[0].name}
            date={form.date}
            time={form.time}
            phone={form.phone}
            services={form.services}
            onClose={() => {
              setShowInvitation(false);
            }}
          />
        )}
      </Box>
    </div>
  );
}
