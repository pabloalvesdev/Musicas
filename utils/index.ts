import { IMusic } from "@/interfaces";

const Utils = {
  sortMusicList: (items: IMusic[], orderBy: "shuffle") => {
    const sortedList: IMusic[] = [];

    if (orderBy === "shuffle") {
      return items.sort(() => Math.random() - 0.5);
    }

    return sortedList;
  },
  darkenHexColor: (hex: string, darkenAmount: number): string => {
    // Remove o # se existir
    hex = hex.replace(/^#/, "");

    // Se for formato curto (ex: #abc), expande para #aabbcc
    if (hex.length === 3) {
      hex = hex
        .split("")
        .map((c) => c + c)
        .join("");
    }

    if (hex.length !== 6) {
      throw new Error("Formato de cor inválido. Use #RRGGBB ou #RGB.");
    }

    // Converte para R, G, B inteiros
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    // Aplica o escurecimento
    const darken = (value: number) => Math.round(value * (1 - darkenAmount));

    const newR = darken(r);
    const newG = darken(g);
    const newB = darken(b);

    // Converte de volta para hexadecimal e formata com 2 dígitos
    const toHex = (value: number) => value.toString(16).padStart(2, "0");

    return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;
  },
};

export default Utils;
