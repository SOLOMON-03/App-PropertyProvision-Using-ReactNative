/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        primary: "#ffffff"
      },
      fontFamily:{
        logo:"Lansdowne",
        KalivoBlack:"Kalivo-Black",
        MaisondeartisanRegular:"MaisondeartisanfreeRegular",
        MontserratBlack:"MontserratBlack",
        MontserratMedium:"MontserratMedium",
        MontserratMediumItalic:"MontserratMediumItalic",
        MontserratSemibold:"MontserratSemibold",
        PoppinsBlack:"Poppins-Black",
        PoppinsBold:"Poppins-Bold",
        PoppinsLight:"Poppins-Light",
        PoppinsItalic:"Poppins-Italic",
        PoppinsSemibold:"Poppins-SemiBold",
        PoppinsThin:"Poppins-Thin",
        Queensides:"Queensides",
        QueensidesLight:"QueensidesLight",
        QueensidesMedium:"QueensidesMedium",
        Swansea:"Swansea",
        SwanseaBold:"SwanseaBold",
        SwanseaItalic:"SwanseaItalic",
        verdanaBold:"verdanaBold",
        verdana:"verdana"
      }
    },
  },
  plugins: [],
}

