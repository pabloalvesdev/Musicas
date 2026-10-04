import { IMusic } from "@/interfaces";

const Utils = {
  sortMusicList: (items: IMusic[], orderBy: "shuffle") => {
    const sortedList: IMusic[] = [];

    if (orderBy === "shuffle") {
      return items.sort(() => Math.random() - 0.5);
    }

    return sortedList;
  },
};

export default Utils;
