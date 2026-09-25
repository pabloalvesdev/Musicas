// /**
//  * Cores usadas em diferentes contextos de um modo de tema.
//  */
interface IModeColors {
  /** Cor de fundo padrão da interface */
  bgDefault: string

  /** Cor de fundo clara, usada em elementos secundários ou cartões */
  bgLight: string

  /** Cor de fundo escura, usada em cabeçalhos ou rodapés */
  bgDark: string

  /** Cor principal do texto, para conteúdos importantes */
  textPrimary: string

  /** Cor secundária do texto, para descrições ou informações menos importantes */
  textSecondary: string

  /** Cor do texto desabilitado ou inativo */
  textDisabled: string

  /** Cor do texto para fundos escuros ou inversos */
  textInverse: string

  /** Cor para mensagens ou estados de erro */
  danger: string

  /** Cor para mensagens ou estados de sucesso */
  success: string

  /** Cor para alertas ou avisos */
  warning: string
}

// /**
//  * Tema geral da aplicação contendo cores, tamanhos e espaçamentos.
//  */
// interface ITheme {
//   /** Cor principal da aplicação, usada em botões, links e destaques */
//   primaryColor: string;

//   /** Conjunto de cores para diferentes contextos visuais */
//   colors: IModeColors;

//   /** Raio de borda para elementos, usado para dar arredondamento */
//   radius: {
//     /** Sem arredondamento, cantos retos */
//     none: number;

//     /** Pequeno arredondamento, ideal para botões pequenos */
//     sm: number;

//     /** Médio arredondamento, para inputs e cartões */
//     md: number;

//     /** Grande arredondamento, para botões maiores e modais */
//     lg: number;

//     /** Muito grande, usado em elementos circulares ou badges */
//     xl: number;

//     /** Extra grande, para bordas muito arredondadas */
//     xxl: number;

//     /** Bordas totalmente arredondadas, para círculos completos */
//     full: number;
//   };

//   /** Tamanhos de fonte padrão da aplicação */
//   fontSizes: {
//     /** Muito pequeno, para legendas ou notas */
//     xxs: number;

//     /** Pequeno, para textos auxiliares */
//     xs: number;

//     /** Médio, para textos normais e parágrafos */
//     sm: number;

//     /** Médio grande, para nomes de componentes e labels */
//     md: number;

//     /** Grande, para títulos de seções e cards */
//     lg: number;

//     /** Muito grande, para cabeçalhos principais */
//     xl: number;

//     /** Extra grande, para títulos destacados e hero text */
//     xxl: number;
//   };

//   /** Espaçamentos usados em margens e paddings */
//   spacing: {
//     /** Muito pequeno, para ajustes finos */
//     xxs: number;

//     /** Pequeno, para espaçamentos compactos */
//     xs: number;

//     /** Médio, para espaçamentos padrão */
//     sm: number;

//     /** Médio grande, para separar seções */
//     md: number;

//     /** Grande, para espaçamentos entre grupos */
//     lg: number;

//     /** Muito grande, para espaçamentos amplos */
//     xl: number;

//     /** Extra grande, para espaçamentos muito largos */
//     xxl: number;
//   };

//   /** Tamanhos padrão para ícones */
//   iconSizes: {
//     /** Pequeno, para ícones em botões pequenos */
//     sm: number;

//     /** Médio, para ícones em botões normais */
//     md: number;

//     /** Grande, para ícones em cabeçalhos */
//     lg: number;

//     /** Muito grande, para ícones decorativos ou de destaque */
//     xl: number;
//   };
// }

// export default ITheme;

interface ITheme {
  chartColors: string[]
  /**
   * **Cor principal da aplicação**
   * Usada em botões, links, destaques e elementos ativos.
   *
   * Exemplo:
   * ```tsx
   * <Button style={{ backgroundColor: theme.primaryColor }} />
   * ```
   */
  primaryColor: string

  /**
   * **Conjunto de cores para diferentes contextos visuais**
   */
  colors: IModeColors

  /**
   * **Raio de borda para elementos, usado para dar arredondamento**
   */
  radius: {
    /** Sem arredondamento, cantos retos. Ideal para tabelas ou caixas técnicas. */
    none: number

    /** Pequeno arredondamento. Ideal para botões pequenos ou chips. */
    sm: number

    /** Médio arredondamento. Para inputs, cartões e botões padrão. */
    md: number

    /** Grande arredondamento. Recomendado para modais, containers ou botões grandes. */
    lg: number

    /** Muito grande. Usado em badges ou imagens com borda circular. */
    xl: number

    /** Extra grande. Para elementos com estilo visual mais suave e amigável. */
    xxl: number

    /** Bordas totalmente arredondadas. Ideal para avatares ou botões circulares. */
    full: number
  }

  /**
   * **Tamanhos de fonte padrão da aplicação**
   */
  fontSizes: {
    /**
     * Muito pequeno (xxs)
     * Para legendas, termos técnicos ou marcações secundárias.
     *
     * Exemplo:
     * ```tsx
     * <Text style={{ fontSize: theme.fontSizes.xxs }}>Detalhes técnicos</Text>
     * ```
     */
    xxs: number

    /**
     * Pequeno (xs)
     * Para textos auxiliares como datas, subtítulos ou rótulos pequenos.
     *
     * Exemplo:
     * ```tsx
     * <Text style={{ fontSize: theme.fontSizes.xs }}>Publicado em 2025</Text>
     * ```
     */
    xs: number

    /**
     * Médio (sm)
     * Para textos padrão como parágrafos, conteúdo principal.
     *
     * Exemplo:
     * ```tsx
     * <Text style={{ fontSize: theme.fontSizes.sm }}>Este é o conteúdo do artigo</Text>
     * ```
     */
    sm: number

    /**
     * Médio grande (md)
     * Usado em labels de inputs, botões padrão ou menus.
     *
     * Exemplo:
     * ```tsx
     * <Text style={{ fontSize: theme.fontSizes.md }}>Nome</Text>
     * ```
     */
    md: number

    /**
     * Grande (lg)
     * Para títulos de seções ou cards.
     *
     * Exemplo:
     * ```tsx
     * <Text style={{ fontSize: theme.fontSizes.lg }}>Seção de Configurações</Text>
     * ```
     */
    lg: number

    /**
     * Muito grande (xl)
     * Para títulos principais ou cabeçalhos de páginas.
     *
     * Exemplo:
     * ```tsx
     * <Text style={{ fontSize: theme.fontSizes.xl }}>Dashboard</Text>
     * ```
     */
    xl: number

    /**
     * Extra grande (xxl)
     * Para hero text ou chamadas de destaque na home.
     *
     * Exemplo:
     * ```tsx
     * <Text style={{ fontSize: theme.fontSizes.xxl }}>Bem-vindo à Plataforma</Text>
     * ```
     */
    xxl: number
  }

  /**
   * **Espaçamentos usados em margens e paddings**
   */
  spacing: {
    /**
     * Muito pequeno (xxs)
     * Para ajustes finos, como espaço entre ícone e texto.
     *
     * Exemplo:
     * ```tsx
     * <View style={{ marginRight: theme.spacing.xxs }} />
     * ```
     */
    xxs: number

    /**
     * Pequeno (xs)
     * Para espaçamentos em listas ou botões pequenos.
     *
     * Exemplo:
     * ```tsx
     * <View style={{ padding: theme.spacing.xs }} />
     * ```
     */
    xs: number

    /**
     * Médio (sm)
     * Para margens padrão entre seções simples.
     *
     * Exemplo:
     * ```tsx
     * <View style={{ marginBottom: theme.spacing.sm }} />
     * ```
     */
    sm: number

    /**
     * Médio grande (md)
     * Para separações visuais entre blocos ou grupos de conteúdo.
     *
     * Exemplo:
     * ```tsx
     * <View style={{ padding: theme.spacing.md }} />
     * ```
     */
    md: number

    /**
     * Grande (lg)
     * Para espaçamento entre grupos maiores como cards e listas.
     *
     * Exemplo:
     * ```tsx
     * <View style={{ marginTop: theme.spacing.lg }} />
     * ```
     */
    lg: number

    /**
     * Muito grande (xl)
     * Para margens em layouts mais complexos ou responsivos.
     *
     * Exemplo:
     * ```tsx
     * <ScrollView contentContainerStyle={{ paddingBottom: theme.spacing.xl }} />
     * ```
     */
    xl: number

    /**
     * Extra grande (xxl)
     * Para espaços externos de containers principais.
     *
     * Exemplo:
     * ```tsx
     * <View style={{ paddingHorizontal: theme.spacing.xxl }} />
     * ```
     */
    xxl: number
  }

  /**
   * **Tamanhos padrão para ícones**
   */
  iconSizes: {
    /**
     * Pequeno (sm)
     * Para botões pequenos, labels, ícones dentro de chips.
     *
     * Exemplo:
     * ```tsx
     * <Icon size={theme.iconSizes.sm} name="check" />
     * ```
     */
    sm: number

    /**
     * Médio (md)
     * Ícone padrão em botões, menus e elementos interativos.
     *
     * Exemplo:
     * ```tsx
     * <Icon size={theme.iconSizes.md} name="arrow-right" />
     * ```
     */
    md: number

    /**
     * Grande (lg)
     * Para uso em cards, cabeçalhos ou destaques.
     *
     * Exemplo:
     * ```tsx
     * <Icon size={theme.iconSizes.lg} name="star" />
     * ```
     */
    lg: number

    /**
     * Muito grande (xl)
     * Ícones decorativos, ilustrações ou heróis visuais.
     *
     * Exemplo:
     * ```tsx
     * <Icon size={theme.iconSizes.xl} name="trophy" />
     * ```
     */
    xl: number
  }
}

export default ITheme
