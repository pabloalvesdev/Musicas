// import { useMemo } from "react";
// import { useMainContext } from "../Context";
import { Dimensions, PixelRatio } from "react-native";
import { ITheme } from "../interfaces";

// 1. Pegamos a largura da tela atual
const { width: SCREEN_WIDTH } = Dimensions.get("window");

// 2. Definimos uma largura de tela "padrão" como base de design (ex: iPhone 11/13 tem ~390px)
const baseWidth = 390;

// 3. Criamos uma função simples de escala
const scale = SCREEN_WIDTH / baseWidth;

// 4. Função para aplicar a escala sem quebrar os pixels do dispositivo
const responsiveSize = (size: number) => {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

// 5. Aplicamos a escala nas suas variáveis base
const spacingBase = responsiveSize(8);
const iconBase = responsiveSize(26);
const ratio = 1.25;

// Aqui está a mágica: em telas pequenas, o fontBase vai diminuir automaticamente!
const fontBase = responsiveSize(18);

// const spacingBase = 8
// const fontBase = 18 //alterar pra 18 dppois, parece ter ficado boa
// const iconBase = 26
// const ratio = 1.25

const lightColors = {
  bgDefault: "#F5F7FA", // ← atualizado
  bgLight: "#FFFFFF",
  bgDark: "#E1E6ED",

  textPrimary: "#1F2937",
  textSecondary: "#6B7280",
  textDisabled: "#9CA3AF",
  textInverse: "#FFFFFF",

  danger: "#f44236",
  success: "#21c179",
  warning: "#ffa500",
};

const darkColors = {
  bgDefault: "#111316", // ← atualizado
  bgLight: "#2A2F36",
  bgDark: "#0d0e11",

  textPrimary: "#B0B5BF", //"#9CA3AF",
  textSecondary: "#64748B",
  textDisabled: "#475569",
  textInverse: "#000000",

  danger: "#f44236",
  success: "#21c179",
  warning: "#ffa500",
};

// const chartColors = [
//   '#792CA2',
//   // '#2B5748',
//   '#618764',
//   // '#FFAE6E',
//   '#EC6530',
//   '#9FA1FF',
//   '#FFD400',
// ]

// Array pronto para colar no seu código
// const chartColors = [
//   '#4EA8DE',
//   '#56CFE1',
//   '#72EFDD',
//   '#A2D2FF',
//   '#BDB2FF',
//   '#FFC6FF',
//   '#FFADAD',
//   '#FFD6A5',
//   '#FDFFB6',
//   '#CAFFBF',
// ]

// Sequência mista: Lilás -> Verde -> Laranja -> Azul -> Rosa...
const chartColors: string[] = [
  "#36A2EB", // Azul Chart.js (Principal)
  "#FF6384", // Rosa/Vermelho
  "#FF9F40", // Laranja
  "#FFCD56", // Amarelo
  "#4BC0C0", // Verde Água / Teal
  "#9966FF", // Roxo
  "#C9CBCF", // Cinza
];
const fontSizes = {
  xxl: fontBase * 2, // ✨ Títulos grandes, headers de tela, hero sections
  xl: fontBase * 1.625, // 🧭 Subtítulos fortes, títulos em cards ou seções
  lg: fontBase * 1.25, // 📝 Título padrão de componentes (ex: nome de item)
  md: fontBase, // 🔤 Texto base, parágrafos, conteúdo geral
  sm: fontBase / 1.25, // 📎 Informações secundárias, legendas
  xs: fontBase / 1.5, // 🔹 Labels pequenas, descrições compactas
  xxs: fontBase / 1.75, // ⚠️ Notas de rodapé, texto super discreto
};
const radius = {
  none: 0, // ▫️ Quadrado total (ex: tabelas, se necessário)
  sm: 2, // 🔲 Canto quase reto, bem sutil
  md: 4, // 🔳 Padrão de botões, inputs
  lg: 8, // 🟦 Cards, containers maiores
  xl: 16, // 🧾 Modais, áreas visuais grandes
  xxl: 32,
  full: 9999, // 🟠 Formas circulares (ex: avatar, botões redondos)
};
const spacing = {
  xxs: spacingBase / 4, // 🔹 Separação mínima, entre ícones ou textos
  xs: spacingBase / 2, // 📏 Pequenos gaps entre elementos (ícone e texto, por ex)
  sm: spacingBase, // 🧱 Espaço padrão interno (padding)
  md: spacingBase * 1.5, // 🔄 Entre blocos pequenos (ex: cards em listas)
  lg: spacingBase * 2, // 🔳 Margens e espaçamentos externos comuns
  xl: spacingBase * 3, // 🧍‍♂️ Separação entre seções, cards, áreas grandes
  xxl: spacingBase * 4, // 🧱 Respiros generosos entre áreas ou telas
};
const iconSizes = {
  xs: Math.round(iconBase / (ratio * ratio)), // ~16
  sm: Math.round(iconBase / ratio), // ~21
  md: iconBase, // 26
  lg: Math.round(iconBase * ratio), // ~32
  xl: Math.round(iconBase * ratio * ratio), // ~40
};

const lightTheme: ITheme = {
  primaryColor: "#88e81a", //"#4D55CC",
  chartColors,
  colors: lightColors,
  fontSizes,
  radius,
  spacing,
  iconSizes,
};
const darkTheme: ITheme = {
  primaryColor: "#88e81a", //"#4D55CC",
  chartColors,
  colors: darkColors,
  fontSizes,
  radius,
  spacing,
  iconSizes,
};

export { darkTheme, lightTheme };
