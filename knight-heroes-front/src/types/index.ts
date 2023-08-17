export type Knight = {
  name: string;
  nickname: string;
  birthday: Date;
  weapons: [
    {
      name: string;
      mod: number;
      attr: string;
      equipped: boolean;
    }
  ];
  attributes: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  keyAttribute: string;
};
