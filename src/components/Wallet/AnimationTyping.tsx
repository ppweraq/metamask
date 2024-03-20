import { Typography } from "@mui/material";
import { motion } from "framer-motion";

const AnimatedTypingText: React.FC<{ text: string }> = ({ text }) => {
  return (
    <Typography>
      {Array.from(text).map((char, index) => (
        <motion.span
          key={index}
          style={{ display: "inline-block", opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.05 }}
        >
          {char === " " ? "\u00A0" : char} {/* Замените пробел на неразрывный пробел */}
        </motion.span>
      ))}
    </Typography>
  );
};
export default AnimatedTypingText;
