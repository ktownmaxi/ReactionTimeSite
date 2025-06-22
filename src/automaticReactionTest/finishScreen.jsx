import { motion } from "framer-motion";

function FinishScreen({}) {
    const confettiCount = 75;

    return (
        <div
            style={{
                height: "100vh",
                width: "100vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                overflow: "hidden",
                fontFamily: "'Comic Sans MS', cursive, sans-serif",
            }}
        >
            {/* Konfetti */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none",
                    overflow: "hidden",
                    zIndex: 1,
                }}
            >
                {[...Array(confettiCount)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ y: -50, opacity: 0 }}
                        animate={{
                            y: "110vh",
                            opacity: [0, 1, 1, 0],
                            x: [Math.random() * -100, Math.random() * 100],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            delay: Math.random(),
                            repeat: Infinity,
                            repeatType: "loop",
                        }}
                        style={{
                            position: "absolute",
                            left: `${Math.random() * 100}%`,
                            width: "12px",
                            height: "12px",
                            backgroundColor: `hsl(${Math.random() * 360}, 80%, 60%)`,
                            borderRadius: "50%",
                            zIndex: 1,
                        }}
                    />
                ))}
            </div>

            {/* Inhalt */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 10 }}
                style={{
                    backgroundColor: "#ffffff",
                    padding: "30px 40px",
                    borderRadius: "20px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                    textAlign: "center",
                    width: "90%",
                    maxWidth: "500px",
                    minHeight: "300px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 2,
                }}
            >
                <motion.h1
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    style={{
                        fontSize: "1.8rem",
                        color: "#4CAF50",
                        marginBottom: "20px",
                    }}
                >
                    🎉 Der Reaktionstest ist beendet! 🎉
                </motion.h1>

                <motion.p
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    style={{ fontSize: "1.2rem", color: "#333", marginBottom: "20px" }}
                >
                    Danke fürs Mitmachen!
                </motion.p>

                <motion.div
                    initial={{ y: 0 }}
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                        repeat: Infinity,
                        duration: 1.4,
                        ease: "easeInOut",
                        delay: 1.2,
                    }}
                    style={{
                        fontSize: "3rem",
                    }}
                >
                    🧠⚡️
                </motion.div>
            </motion.div>
        </div>
    );
}

export default FinishScreen;
