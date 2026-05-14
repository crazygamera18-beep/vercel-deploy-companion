// Catálogo Capybara Headshop — produtos comerciais (sem dados internos)
import sedaElements from "@/assets/products/seda-elements-king-size.jpg";
import sedaPapelito from "@/assets/products/seda-papelito-king-size.jpg";
import sedaRaw from "@/assets/products/seda-raw-classic-king-size.jpg";
import sedaSadhu from "@/assets/products/seda-sadhu-evening-brown.jpg";
import sedaZomo from "@/assets/products/seda-zomo-brown.jpg";
import sedaGuru from "@/assets/products/seda-guru-spirit-brown.jpg";
import sedaBemBolado from "@/assets/products/seda-bem-bolado-pop.jpg";

import piteiraBemBolado from "@/assets/products/piteira-bem-bolado-girls.jpg";
import piteiraTonabePremium from "@/assets/products/piteira-tonabe-premium.jpg";
import piteiraTonabeMega from "@/assets/products/piteira-tonabe-mega-longa.webp";
import piteiraVidroBlack from "@/assets/products/piteira-vidro-black.jpg";
import piteiraVidroMini from "@/assets/products/piteira-vidro-miniatura.jpeg";
import piteiraOgFrozen from "@/assets/products/piteira-og-frozen.jpeg";
import piteiraOgEspiral from "@/assets/products/piteira-og-espiral.jpeg";
import piteiraOgMelt from "@/assets/products/piteira-og-melt.jpeg";
import piteiraOgBasica from "@/assets/products/piteira-og-basica.jpeg";

import isqueiroChama from "@/assets/products/isqueiro-chama-grande.jpg";
import clipperMini from "@/assets/products/clipper-mini.jpg";

import slickMms from "@/assets/products/slick-mms.jpeg";
import slick7x1 from "@/assets/products/slick-silicone-7x1.jpeg";
import slickNozes from "@/assets/products/slick-nozes.jpeg";
import slickPokebola from "@/assets/products/slick-pokebola.jpeg";
import slickTriangulo from "@/assets/products/slick-triangulo.jpeg";
import slickAbelha from "@/assets/products/slick-abelha.jpeg";

import cuia67 from "@/assets/products/cuia-67mm.jpeg";
import tabacoAcrema from "@/assets/products/tabaco-acrema.webp";
import tabacoDuhbom from "@/assets/products/tabaco-duhbom.jpg";
import tesouraDobravel from "@/assets/products/tesoura-dobravel.jpg";
import dichavadorSadhu from "@/assets/products/dichavador-sadhu.jpg";
import bandejaSadhuGrande from "@/assets/products/bandeja-sadhu-grande.webp";
import bandejaMini from "@/assets/products/bandeja-mini.jpeg";
import antiRato from "@/assets/products/anti-rato-isqueiro.jpg";
import anelSilicone from "@/assets/products/anel-silicone-sadhu.webp";

import casePuffRaw from "@/assets/products/case-puff-raw-castor.webp";
import caseRawRed from "@/assets/products/case-raw-red.webp";
import casePuffLilWhind from "@/assets/products/case-puff-lil-whind.webp";
import caseSadhuGrande from "@/assets/products/case-sadhu-grande.webp";

export const CATEGORIES = [
  "Sedas",
  "Piteiras",
  "Piteiras de vidro",
  "Slicks",
  "Dichavadores",
  "Cases",
  "Bandejas",
  "Cuias",
  "Tabacos",
  "Tesouras",
  "Isqueiros",
  "Acessórios",
] as const;

export type Category = (typeof CATEGORIES)[number];

export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  images?: string[];
  alt: string;
  description: string;
  category: Category;
  active: boolean;
};

const slugify = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const p = (
  id: string,
  name: string,
  category: Category,
  price: number,
  image: string,
  description: string,
): Product => ({
  id,
  slug: slugify(name),
  name,
  category,
  price,
  image,
  alt: `${name} — Capybara Headshop`,
  description,
  active: true,
});

export const PRODUCTS: Product[] = [
  // Sedas
  p("sed-elements", "Seda Elements King Size", "Sedas", 10.9, sedaElements,
    "Seda king size de queima limpa e ótima saída. Clássica e versátil."),
  p("sed-papelito", "Seda Papelito King Size Tradicional", "Sedas", 4.9, sedaPapelito,
    "Seda tradicional king size com excelente custo-benefício para o dia a dia."),
  p("sed-raw", "Seda RAW Classic King Size", "Sedas", 11.9, sedaRaw,
    "RAW Classic king size: papel natural, pura e sem branqueamento."),
  p("sed-sadhu", "Seda Sadhu Evening Large Brown Longa", "Sedas", 6.9, sedaSadhu,
    "Seda longa marrom com queima suave e estilo nacional."),
  p("sed-zomo", "Seda Zomo Brown King Size", "Sedas", 3.3, sedaZomo,
    "Seda brown king size acessível, ideal para reposição."),
  p("sed-guru", "Seda Guru Spirit Brown Longa Slim", "Sedas", 5.9, sedaGuru,
    "Seda slim longa marrom com pegada artesanal e queima leve."),
  p("sed-bembolado", "Seda Bem Bolado Pop King Size Slim", "Sedas", 5.9, sedaBemBolado,
    "Bem Bolado Pop king size slim: estilo brasileiro com bom caimento."),

  // Piteiras
  p("pit-bembolado", "Piteira Bem Bolado Girls In Green Hiper Large", "Piteiras", 10.9, piteiraBemBolado,
    "Piteira hiper large estampada para uma rolagem mais firme e estilosa."),
  p("pit-tonabe-premium", "Piteira To Na Be Premium Extra Large", "Piteiras", 8.9, piteiraTonabePremium,
    "Piteira extra large premium com gramatura ideal e ótima fixação."),
  p("pit-tonabe-mega", "Piteira To Na Be Mega Longa", "Piteiras", 14.9, piteiraTonabeMega,
    "Piteira mega longa para roladas generosas e confortáveis."),

  // Piteiras de vidro
  p("piv-black", "Piteira de Vidro Black Artística", "Piteiras de vidro", 34.9, piteiraVidroBlack,
    "Piteira de vidro com visual artístico em preto e ótimo acabamento."),
  p("piv-mini", "Piteira de Vidro Artística Especial Miniatura (Perguntar quais piteiras há disponíveis e valores.)", "Piteiras de vidro", 89.9, piteiraVidroMini,
    "Modelo artístico especial miniatura. Consulte para analisar as opções e os valores disponíveis."),
  p("piv-og-frozen", "Piteira OG Vidro Frozen", "Piteiras de vidro", 24.9, piteiraOgFrozen,
    "Piteira OG em vidro frozen, leve e com toque suave."),
  p("piv-og-espiral", "Piteira OG Vidro Espiral", "Piteiras de vidro", 24.9, piteiraOgEspiral,
    "Piteira OG em vidro com detalhe em espiral marcante."),
  p("piv-og-basica", "Piteira OG Vidro Básica", "Piteiras de vidro", 9.9, piteiraOgBasica,
    "Piteira OG básica em vidro: simples, durável e prática."),

  // Slicks
  p("sli-mms", "Slick MM's 5ml", "Slicks", 15.9, slickMms,
    "Slick MM's 5ml com visual colorido e silicone resistente."),
  p("sli-7x1", "Slick de Silicone 7x1", "Slicks", 49.9, slick7x1,
    "Kit slick de silicone 7x1 para organizar tudo em um só lugar."),
  p("sli-nozes", "Slick Nozes 4ml", "Slicks", 14.9, slickNozes,
    "Slick formato noz 4ml — compacto e fácil de levar."),
  p("sli-pokebola", "Slick Silicone 5ml Pokébola", "Slicks", 15.9, slickPokebola,
    "Slick pokébola 5ml em silicone, item nostálgico e divertido."),
  p("sli-triangulo", "Slick de Silicone Triângulo", "Slicks", 29.9, slickTriangulo,
    "Slick triangular em silicone com bom volume e design diferente."),
  p("sli-abelha", "Slick Abelha 5ml", "Slicks", 15.9, slickAbelha,
    "Slick abelha 5ml em silicone colorido, leve e estiloso."),

  // Dichavadores
  p("dic-sadhu", "Dichavador Triturador Sadhu", "Dichavadores", 19.9, dichavadorSadhu,
    "Dichavador Sadhu compacto, com ótimo corte e durabilidade."),

  // Cases
  p("cas-raw-castor", "Case Puff Classic Raw Castor", "Cases", 179.9, casePuffRaw,
    "Case Puff Classic Raw Castor: visual premium e organização completa."),
  p("cas-raw-red", "Case Raw Red", "Cases", 179.9, caseRawRed,
    "Case Raw Red com acabamento marcante e ótima percepção de valor."),
  p("cas-lil-whind", "Case Puff Life Pro Collab Lil Whind", "Cases", 229.9, casePuffLilWhind,
    "Edição collab Lil Whind: case top de linha, prática e estilosa."),
  p("cas-sadhu-canhamo", "Case Sadhu Grande Clássica Cânhamo", "Cases", 134.9, caseSadhuGrande,
    "Case Sadhu grande em cânhamo: clássica, espaçosa e versátil."),

  // Bandejas
  p("ban-sadhu-grande", "Bandeja de Metal Sadhu Grande 2 Divisórias", "Bandejas", 64.9, bandejaSadhuGrande,
    "Bandeja Sadhu grande em metal com 2 divisórias para organizar tudo."),
  p("ban-mini", "Bandeja Mini", "Bandejas", 19.9, bandejaMini,
    "Bandeja mini portátil — leve para qualquer lugar."),

  // Cuias
  p("cui-67", "Cuia 67mm Grande", "Cuias", 17.9, cuia67,
    "Cuia 67mm grande com bom volume e acabamento confiável."),

  // Tabacos
  p("tab-acrema", "Tabaco Acrema", "Tabacos", 19.9, tabacoAcrema,
    "Tabaco Acrema com sabor equilibrado e queima agradável."),
  p("tab-duhbom", "Tabaco Duhbom", "Tabacos", 16.9, tabacoDuhbom,
    "Tabaco Duhbom: aroma marcante e ótimo custo-benefício."),

  // Tesouras
  p("tes-dobravel", "Tesoura Dobrável Inox", "Tesouras", 19.9, tesouraDobravel,
    "Tesoura dobrável em inox: prática, segura e fácil de carregar."),

  // Isqueiros (Fogo)
  p("isq-chama-grande", "Isqueiro Chama Grande", "Isqueiros", 2.9, isqueiroChama,
    "Isqueiro de chama grande, prático e econômico."),
  p("isq-clipper-mini", "Clipper Mini", "Isqueiros", 6.9, clipperMini,
    "Clipper Mini: o clássico recarregável em tamanho compacto."),

  // Acessórios
  p("acc-anti-rato", "Anti Rato de Isqueiro para Clipper e Bic", "Acessórios", 19.9, antiRato,
    "Acessório anti rato para Clipper e Bic — protege o seu isqueiro."),
  p("acc-anel-sadhu", "Anel de Silicone Sadhu", "Acessórios", 17.9, anelSilicone,
    "Anel de silicone Sadhu: proteção e estilo para suas peças de vidro."),
];

export const formatBRL = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const discountPct = (p: Product) =>
  p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
