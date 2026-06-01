import { useState, useMemo, useEffect } from "react";

const INITIAL_DB = {
  proveedores: [
    { id: 1, nombre: "Alfran Tabaco", emoji: "🚬", color: "#E11D48", tel: "+34 680 38 09 89" },
    { id: 2, nombre: "Costasur", emoji: "🍾", color: "#7C3AED", tel: "+34 665 68 42 48" },
    { id: 3, nombre: "Coca Cola", emoji: "🥤", color: "#DC2626", tel: "+34 696 35 75 48" },
    { id: 4, nombre: "Ahembo", emoji: "💧", color: "#0284C7", tel: "+34 669 76 77 44" },
    { id: 5, nombre: "Alfran Galletas", emoji: "🍪", color: "#F59E0B", tel: "+34 639 34 77 10" },
    { id: 6, nombre: "Kero Sur", emoji: "🇬🇧", color: "#059669", tel: "+34 615 01 59 56" },
    { id: 7, nombre: "Galago", emoji: "🍶", color: "#0891B2", tel: "+34 666 51 62 91" },
    { id: 8, nombre: "Crefusa", emoji: "🌿", color: "#65A30D", tel: "+34 669 70 31 57" },
    { id: 9, nombre: "Huevos", emoji: "🥚", color: "#D97706", tel: "+34 610 77 03 55" },
    { id: 10, nombre: "MYA TGT", emoji: "🧀", color: "#B45309", tel: "+34 673 50 39 01" },
    { id: 11, nombre: "Cash Diplo", emoji: "🛒", color: "#0F766E", tel: "+34 636 48 27 53" },
    { id: 12, nombre: "Mega Vapers", emoji: "🚬", color: "#7C3AED", tel: "+34 667 66 42 77" },
    { id: 13, nombre: "Saladul", emoji: "🍬", color: "#EC4899", tel: "+34 652 43 30 62" },
    { id: 14, nombre: "Westfalia", emoji: "🥓", color: "#92400E", tel: "+34 690 14 90 47" },
    { id: 15, nombre: "Roper", emoji: "🥨", color: "#B45309", tel: "+34 677 46 79 43" },
    { id: 16, nombre: "Italiano", emoji: "🇮🇹", color: "#16A34A", tel: "+34 603 38 88 81" },
    { id: 17, nombre: "Fonteide", emoji: "💦", color: "#0EA5E9", tel: "+34 674 99 74 32" },
    { id: 18, nombre: "Ombu", emoji: "🥪", color: "#15803D", tel: "+34 677 24 56 20" },
    { id: 19, nombre: "Tabaco Boca Pablo", emoji: "💨", color: "#6D28D9", tel: "+34 673 21 70 80" },
    { id: 20, nombre: "Productos Sin Gluten", emoji: "🌾", color: "#D97706", tel: "+34 627 58 47 37" },
    { id: 21, nombre: "Leche Fresco", emoji: "🥛", color: "#0284C7", tel: "+34 661 73 22 72" },
  ],
  productos: [
    { id: 1, prov: 1, nombre: "Marlboro Gold", cat: "Marlboro" },
    { id: 2, prov: 1, nombre: "Marlboro Rojo", cat: "Marlboro" },
    { id: 3, prov: 1, nombre: "Chester Normal", cat: "Chester" },
    { id: 4, prov: 1, nombre: "Chester 24", cat: "Chester" },
    { id: 5, prov: 1, nombre: "Chester Azul", cat: "Chester" },
    { id: 6, prov: 1, nombre: "Camel Azul", cat: "Camel" },
    { id: 7, prov: 1, nombre: "Camel Amarillo", cat: "Camel" },
    { id: 8, prov: 1, nombre: "Winston Azul", cat: "Winston" },
    { id: 9, prov: 1, nombre: "Winston Rojo Papel", cat: "Winston" },
    { id: 10, prov: 1, nombre: "Lucky Strike Rojo", cat: "Lucky Strike" },
    { id: 11, prov: 1, nombre: "Lucky Strike Eclipse", cat: "Lucky Strike" },
    { id: 12, prov: 1, nombre: "LM Rojo", cat: "LM" },
    { id: 13, prov: 1, nombre: "LM Azul", cat: "LM" },
    { id: 14, prov: 1, nombre: "Sterling Verde", cat: "Otros" },
    { id: 15, prov: 1, nombre: "LB Azul", cat: "Otros" },
    { id: 16, prov: 1, nombre: "LB Silver", cat: "Otros" },
    { id: 17, prov: 1, nombre: "JPS Rojo", cat: "Otros" },
    { id: 18, prov: 1, nombre: "Silk Cut Lilac", cat: "Otros" },
    { id: 19, prov: 1, nombre: "Pall Mall Azul", cat: "Otros" },
    { id: 20, prov: 1, nombre: "Benson Rojo Largo", cat: "Benson" },
    { id: 21, prov: 1, nombre: "Benson Azul", cat: "Benson" },
    { id: 22, prov: 1, nombre: "Benson Rojo", cat: "Benson" },
    { id: 23, prov: 1, nombre: "Vogue Azul", cat: "Vogue" },
    { id: 24, prov: 1, nombre: "Allure Lila", cat: "Otros" },
    { id: 25, prov: 1, nombre: "Corset Lila", cat: "Otros" },
    { id: 26, prov: 1, nombre: "Karelia Amarilla", cat: "Otros" },
    { id: 27, prov: 1, nombre: "Ome Verde", cat: "Otros" },
    { id: 28, prov: 1, nombre: "Amberleaf de 10", cat: "Tabaco Liar" },
    { id: 29, prov: 1, nombre: "Pueblo Tabaco Liar", cat: "Tabaco Liar" },
    { id: 30, prov: 1, nombre: "Mayfair Dark Blue", cat: "Otros" },
    { id: 31, prov: 1, nombre: "Terea Russet", cat: "Terea / IQOS" },
    { id: 32, prov: 1, nombre: "Terea Turquesa", cat: "Terea / IQOS" },
    { id: 33, prov: 1, nombre: "Velo Cherry Ice", cat: "Nicotina" },
    { id: 34, prov: 1, nombre: "Velo Peach Ice", cat: "Nicotina" },
    { id: 35, prov: 2, nombre: "1906 Pack Botellas 25cl", cat: "Cerveza" },
    { id: 36, prov: 2, nombre: "1906 Botellas", cat: "Cerveza" },
    { id: 37, prov: 2, nombre: "Heineken 50cl", cat: "Cerveza" },
    { id: 38, prov: 2, nombre: "Heineken Pack Botellas 25cl", cat: "Cerveza" },
    { id: 39, prov: 2, nombre: "Heineken Botellas 33cl", cat: "Cerveza" },
    { id: 40, prov: 2, nombre: "Heineken Latas 33cl Promo", cat: "Cerveza" },
    { id: 41, prov: 2, nombre: "Heineken 50cl Lata", cat: "Cerveza" },
    { id: 42, prov: 2, nombre: "San Miguel Pack Botellas 25cl", cat: "Cerveza" },
    { id: 43, prov: 2, nombre: "San Miguel Lata 33cl", cat: "Cerveza" },
    { id: 44, prov: 2, nombre: "San Miguel Latas 33cl Pack 12", cat: "Cerveza" },
    { id: 45, prov: 2, nombre: "San Miguel 50cl", cat: "Cerveza" },
    { id: 46, prov: 2, nombre: "San Miguel 1L", cat: "Cerveza" },
    { id: 47, prov: 2, nombre: "Corona Pack Botellas 6 Promo", cat: "Cerveza" },
    { id: 48, prov: 2, nombre: "Desperados Botellas 33cl", cat: "Cerveza" },
    { id: 49, prov: 2, nombre: "Desperados Latas 50cl", cat: "Cerveza" },
    { id: 50, prov: 2, nombre: "Budweiser Botellas", cat: "Cerveza" },
    { id: 51, prov: 2, nombre: "Dorada Latas 33cl", cat: "Cerveza" },
    { id: 52, prov: 2, nombre: "Dorada Especial Lata", cat: "Cerveza" },
    { id: 53, prov: 2, nombre: "Dorada 50cl", cat: "Cerveza" },
    { id: 54, prov: 2, nombre: "Dorada 75cl", cat: "Cerveza" },
    { id: 55, prov: 2, nombre: "Dorada Pack Botellas 25cl", cat: "Cerveza" },
    { id: 56, prov: 2, nombre: "Peroni Botellas", cat: "Cerveza" },
    { id: 57, prov: 2, nombre: "Magners Lata 50cl", cat: "Cerveza" },
    { id: 58, prov: 2, nombre: "Magners Botellas 568ml", cat: "Cerveza" },
    { id: 59, prov: 2, nombre: "Kopparberg Fresa Lima", cat: "Cerveza" },
    { id: 60, prov: 2, nombre: "Kopparberg Fresa Lima Lata", cat: "Cerveza" },
    { id: 61, prov: 2, nombre: "Kopparberg Wildberries", cat: "Cerveza" },
    { id: 62, prov: 2, nombre: "Strongbow Lata", cat: "Cerveza" },
    { id: 63, prov: 2, nombre: "Smirnoff Ice Lata", cat: "RTD" },
    { id: 64, prov: 2, nombre: "Smirnoff Ice Grande 70cl", cat: "RTD" },
    { id: 65, prov: 2, nombre: "Smirnoff Ice Pequeño Botellas", cat: "RTD" },
    { id: 66, prov: 2, nombre: "WKD Azul Pequeño", cat: "RTD" },
    { id: 67, prov: 2, nombre: "Bacardi Breezer Lima", cat: "RTD" },
    { id: 68, prov: 2, nombre: "Bacardi Breezer Naranja", cat: "RTD" },
    { id: 69, prov: 2, nombre: "Bacardi Breezer Sandía", cat: "RTD" },
    { id: 70, prov: 2, nombre: "Passoa Lata", cat: "RTD" },
    { id: 71, prov: 2, nombre: "7UP Normal Lata", cat: "RTD" },
    { id: 72, prov: 2, nombre: "7UP Free Lata", cat: "RTD" },
    { id: 73, prov: 2, nombre: "Schweppes Tónica Lata", cat: "RTD" },
    { id: 74, prov: 2, nombre: "Nestea Mango Piña 50cl", cat: "RTD" },
    { id: 75, prov: 2, nombre: "Pepsi Normal Lata", cat: "RTD" },
    { id: 76, prov: 2, nombre: "Pepsi Max Lata", cat: "RTD" },
    { id: 77, prov: 2, nombre: "Red Bull 250ml", cat: "Energéticas" },
    { id: 78, prov: 2, nombre: "Red Bull Sin Azúcar 250ml", cat: "Energéticas" },
    { id: 79, prov: 2, nombre: "Powerking 250ml Original", cat: "Energéticas" },
    { id: 80, prov: 2, nombre: "Powerking Sandía 250ml", cat: "Energéticas" },
    { id: 81, prov: 2, nombre: "Powerking Piña 250ml", cat: "Energéticas" },
    { id: 82, prov: 2, nombre: "Smirnoff Vodka 1L", cat: "Vodka" },
    { id: 83, prov: 2, nombre: "Smirnoff Vodka 35cl", cat: "Vodka" },
    { id: 84, prov: 2, nombre: "Smirnoff Vodka 20cl", cat: "Vodka" },
    { id: 85, prov: 2, nombre: "Absolut 1L", cat: "Vodka" },
    { id: 86, prov: 2, nombre: "Absolut Lima 1L", cat: "Vodka" },
    { id: 87, prov: 2, nombre: "Absolut Raspberry 1L", cat: "Vodka" },
    { id: 88, prov: 2, nombre: "Absolut Vodka 35cl", cat: "Vodka" },
    { id: 89, prov: 2, nombre: "Absolut Vodka 20cl", cat: "Vodka" },
    { id: 90, prov: 2, nombre: "Miniatura Absolut", cat: "Miniaturas" },
    { id: 91, prov: 2, nombre: "Miniatura Smirnoff Vodka", cat: "Miniaturas" },
    { id: 92, prov: 2, nombre: "Miniatura Belvedere", cat: "Miniaturas" },
    { id: 93, prov: 2, nombre: "Black Label 1L", cat: "Whisky" },
    { id: 94, prov: 2, nombre: "Jameson 1L", cat: "Whisky" },
    { id: 95, prov: 2, nombre: "Jack Daniels 35cl", cat: "Whisky" },
    { id: 96, prov: 2, nombre: "Jack Daniels Honey 1L", cat: "Whisky" },
    { id: 97, prov: 2, nombre: "Jim Beam 1L", cat: "Whisky" },
    { id: 98, prov: 2, nombre: "Grants 1L", cat: "Whisky" },
    { id: 99, prov: 2, nombre: "Grants Cristal 1L", cat: "Whisky" },
    { id: 100, prov: 2, nombre: "Torres 10 1L", cat: "Whisky" },
    { id: 101, prov: 2, nombre: "Miniatura Jameson", cat: "Miniaturas" },
    { id: 102, prov: 2, nombre: "Miniatura Jack Daniels", cat: "Miniaturas" },
    { id: 103, prov: 2, nombre: "Miniatura Jack Daniels Fire", cat: "Miniaturas" },
    { id: 104, prov: 2, nombre: "Miniatura Red Label", cat: "Miniaturas" },
    { id: 105, prov: 2, nombre: "Capitán Morgan Spiced 1L", cat: "Ron" },
    { id: 106, prov: 2, nombre: "Capitán Morgan Spiced 20cl", cat: "Ron" },
    { id: 107, prov: 2, nombre: "Capitán Morgan Negro 1L", cat: "Ron" },
    { id: 108, prov: 2, nombre: "Havana 5 1L", cat: "Ron" },
    { id: 109, prov: 2, nombre: "Ron Miel Artemi 1L", cat: "Ron" },
    { id: 110, prov: 2, nombre: "Ron Miel Artemi 35cl", cat: "Ron" },
    { id: 111, prov: 2, nombre: "Arehucas Oro 35cl", cat: "Ron" },
    { id: 112, prov: 2, nombre: "Arehucas Blanco 1L", cat: "Ron" },
    { id: 113, prov: 2, nombre: "Ron Barceló 70cl", cat: "Ron" },
    { id: 114, prov: 2, nombre: "Ginebra Tanqueray 70cl", cat: "Ginebra" },
    { id: 115, prov: 2, nombre: "Gordon's 1L", cat: "Ginebra" },
    { id: 116, prov: 2, nombre: "Gordon's Pink 70cl", cat: "Ginebra" },
    { id: 117, prov: 2, nombre: "Bombay Sapphire 1L", cat: "Ginebra" },
    { id: 118, prov: 2, nombre: "Larios 1L", cat: "Ginebra" },
    { id: 119, prov: 2, nombre: "Tequila Rose Original 70cl", cat: "Tequila" },
    { id: 120, prov: 2, nombre: "Tequila Sierra Oro 35cl", cat: "Tequila" },
    { id: 121, prov: 2, nombre: "Miniatura Tequila Sierra Gold", cat: "Miniaturas" },
    { id: 122, prov: 2, nombre: "Miniatura Tequila Rose", cat: "Miniaturas" },
    { id: 123, prov: 2, nombre: "Jägermeister 35cl", cat: "Licores" },
    { id: 124, prov: 2, nombre: "Jägermeister 1L", cat: "Licores" },
    { id: 125, prov: 2, nombre: "Miniatura Jägermeister", cat: "Miniaturas" },
    { id: 126, prov: 2, nombre: "Fernet Branca 70cl", cat: "Licores" },
    { id: 127, prov: 2, nombre: "Baileys 1L", cat: "Licores" },
    { id: 128, prov: 2, nombre: "Amaretto Barbero 70cl", cat: "Licores" },
    { id: 129, prov: 2, nombre: "Limoncello 1L", cat: "Licores" },
    { id: 130, prov: 2, nombre: "Courvoisier 1L", cat: "Licores" },
    { id: 131, prov: 2, nombre: "Malibu 1L", cat: "Licores" },
    { id: 132, prov: 2, nombre: "Disaronno 35cl", cat: "Licores" },
    { id: 133, prov: 2, nombre: "Brandy Soberano 1L", cat: "Licores" },
    { id: 134, prov: 2, nombre: "Licor Amaro Montenegro", cat: "Licores" },
    { id: 135, prov: 2, nombre: "Antioqueño Azul 70cl", cat: "Licores" },
    { id: 136, prov: 2, nombre: "Puerto Indias Rosado 70cl", cat: "Licores" },
    { id: 137, prov: 2, nombre: "Miniatura Fireball", cat: "Miniaturas" },
    { id: 138, prov: 2, nombre: "Miniatura Grey Goose", cat: "Miniaturas" },
    { id: 139, prov: 2, nombre: "Miniatura Malibu", cat: "Miniaturas" },
    { id: 140, prov: 2, nombre: "Miniatura Hennessy", cat: "Miniaturas" },
    { id: 141, prov: 2, nombre: "Barefoot White Zinfandel", cat: "Vino" },
    { id: 142, prov: 2, nombre: "Barefoot Pink Moscato", cat: "Vino" },
    { id: 143, prov: 2, nombre: "Barefoot Pinot Grigio Blanco", cat: "Vino" },
    { id: 144, prov: 2, nombre: "Sangría Peñasol Brik 1L", cat: "Vino" },
    { id: 145, prov: 2, nombre: "Sangría Don Simón Pet 1.5L", cat: "Vino" },
    { id: 146, prov: 2, nombre: "Consigna Cabernet Tinto", cat: "Vino" },
    { id: 147, prov: 2, nombre: "Cruzares Tinto Brik 1L", cat: "Vino" },
    { id: 148, prov: 2, nombre: "Castillo Liria Rosado", cat: "Vino" },
    { id: 149, prov: 2, nombre: "El Coto Rosado", cat: "Vino" },
    { id: 150, prov: 2, nombre: "Mateus Rosé Grande", cat: "Vino" },
    { id: 151, prov: 2, nombre: "Viña Albali Blanco Seco", cat: "Vino" },
    { id: 152, prov: 2, nombre: "Viña Albali Crianza Tinto", cat: "Vino" },
    { id: 153, prov: 2, nombre: "Los Molinos Tinto 75cl", cat: "Vino" },
    { id: 154, prov: 2, nombre: "Viña Sol Grande", cat: "Vino" },
    { id: 155, prov: 2, nombre: "Protos Tinto", cat: "Vino" },
    { id: 156, prov: 2, nombre: "JP Chenet Apple Verde 200ml", cat: "Vino" },
    { id: 157, prov: 2, nombre: "JP Chenet Cassis Violeta 200ml", cat: "Vino" },
    { id: 158, prov: 2, nombre: "JP Chenet Lila 200ml", cat: "Vino" },
    { id: 159, prov: 2, nombre: "JP Chenet Verde 200ml", cat: "Vino" },
    { id: 160, prov: 2, nombre: "JP Chenet Pequeño Manzana 200ml", cat: "Vino" },
    { id: 161, prov: 2, nombre: "Freixenet Carta Nevada Semiseco Grande", cat: "Cava" },
    { id: 162, prov: 2, nombre: "Freixenet Cordón Negro Semiseco Grande", cat: "Cava" },
    { id: 163, prov: 2, nombre: "Cava Jaume Serra Brut", cat: "Cava" },
    { id: 164, prov: 2, nombre: "Don Luciano Cava Semiseco", cat: "Cava" },
    { id: 165, prov: 2, nombre: "Bezoya 1.5L", cat: "Agua" },
    { id: 166, prov: 2, nombre: "Agua Krystal 1.5L", cat: "Agua" },
    { id: 167, prov: 2, nombre: "Agua Krystal 50cl", cat: "Agua" },
    { id: 168, prov: 2, nombre: "Don Simón Mango 1L", cat: "Zumos" },
    { id: 169, prov: 2, nombre: "Don Simón Naranja 1L", cat: "Zumos" },
    { id: 170, prov: 2, nombre: "Don Simón Piña 1L", cat: "Zumos" },
    { id: 171, prov: 2, nombre: "Ribeira Atún Aceite Girasol 70g", cat: "Conservas" },
    { id: 172, prov: 2, nombre: "Ribeira Caballas Aceite Girasol 85g", cat: "Conservas" },
    { id: 173, prov: 2, nombre: "Azúcar 1kg", cat: "Otros" },
    { id: 174, prov: 2, nombre: "Papel Cocina", cat: "Otros" },
    { id: 201, prov: 3, nombre: "Coca Cola Normal 50cl", cat: "Botella 50cl" },
    { id: 202, prov: 3, nombre: "Coca Cola Zero 50cl", cat: "Botella 50cl" },
    { id: 203, prov: 3, nombre: "Fanta Limón 50cl", cat: "Botella 50cl" },
    { id: 204, prov: 3, nombre: "Fanta Naranja 50cl", cat: "Botella 50cl" },
    { id: 205, prov: 3, nombre: "Fanta Sandía 50cl", cat: "Botella 50cl" },
    { id: 206, prov: 3, nombre: "Sprite 50cl", cat: "Botella 50cl" },
    { id: 207, prov: 3, nombre: "Aquarius Naranja 50cl", cat: "Botella 50cl" },
    { id: 208, prov: 3, nombre: "Aquarius Limón 50cl", cat: "Botella 50cl" },
    { id: 209, prov: 3, nombre: "Fuze Tea Limón 50cl", cat: "Botella 50cl" },
    { id: 210, prov: 3, nombre: "Powerade Azul 50cl", cat: "Botella 50cl" },
    { id: 211, prov: 3, nombre: "Powerade Rojo 50cl", cat: "Botella 50cl" },
    { id: 212, prov: 3, nombre: "Powerade Mango 50cl", cat: "Botella 50cl" },
    { id: 213, prov: 3, nombre: "Coca Cola Normal 1.5L", cat: "Botella 1.5L" },
    { id: 214, prov: 3, nombre: "Coca Cola Zero 1.5L", cat: "Botella 1.5L" },
    { id: 215, prov: 3, nombre: "Coca Cola Light 1.5L", cat: "Botella 1.5L" },
    { id: 216, prov: 3, nombre: "Fanta Limón 1.5L", cat: "Botella 1.5L" },
    { id: 217, prov: 3, nombre: "Fanta Naranja 1.5L", cat: "Botella 1.5L" },
    { id: 218, prov: 3, nombre: "Fanta Naranja Zero 1.5L", cat: "Botella 1.5L" },
    { id: 219, prov: 3, nombre: "Sprite 1.5L", cat: "Botella 1.5L" },
    { id: 220, prov: 3, nombre: "Aquarius Naranja 1.5L", cat: "Botella 1.5L" },
    { id: 221, prov: 3, nombre: "Aquarius Limón 1.5L", cat: "Botella 1.5L" },
    { id: 222, prov: 3, nombre: "Aquarius Melocotón Rojo 1.5L", cat: "Botella 1.5L" },
    { id: 223, prov: 3, nombre: "Fuze Tea Melocotón 1.5L", cat: "Botella 1.5L" },
    { id: 224, prov: 3, nombre: "Powerade Azul 1L", cat: "Botella 1L" },
    { id: 225, prov: 3, nombre: "Coca Cola Normal Lata 33cl", cat: "Lata" },
    { id: 226, prov: 3, nombre: "Coca Cola Light Lata", cat: "Lata" },
    { id: 227, prov: 3, nombre: "Absolut Sprite Lata", cat: "Lata" },
    { id: 228, prov: 3, nombre: "Absolut Sandía Lata", cat: "Lata" },
    { id: 229, prov: 3, nombre: "Jack Daniels Cola Lata", cat: "Lata" },
    { id: 237, prov: 3, nombre: "Fanta Sandía Lata", cat: "Lata" },
    { id: 238, prov: 3, nombre: "Fanta Tutti Frutti Lata", cat: "Lata" },
    { id: 239, prov: 3, nombre: "Fanta Naranja Zero Lata", cat: "Lata" },
    { id: 240, prov: 3, nombre: "Fanta Naranja Normal Lata", cat: "Lata" },
    { id: 241, prov: 3, nombre: "Coca Cola Zero Lata", cat: "Lata" },
    { id: 242, prov: 3, nombre: "Aquarius Naranja Lata", cat: "Lata" },
    { id: 243, prov: 3, nombre: "Aquarius Limón Lata", cat: "Lata" },
    { id: 244, prov: 3, nombre: "Coca Cola 50cl Lata", cat: "Lata" },
    { id: 245, prov: 3, nombre: "Coca Cola Zero 50cl Lata", cat: "Lata" },
    { id: 246, prov: 3, nombre: "Fanta Limón Zero Lata", cat: "Lata" },
    { id: 247, prov: 3, nombre: "Fanta Naranja Lata", cat: "Lata" },
    { id: 248, prov: 3, nombre: "Aquarius Extra Verde Lata", cat: "Lata" },
    { id: 249, prov: 3, nombre: "Aquarius Extra Rojo Lata", cat: "Lata" },
    { id: 250, prov: 3, nombre: "Bacardi Cola Lata", cat: "Lata" },
    { id: 251, prov: 3, nombre: "Sprite Lata", cat: "Lata" },
    { id: 252, prov: 3, nombre: "Fuze Tea Mango Piña Lata", cat: "Lata" },
    { id: 253, prov: 3, nombre: "Fanta Limón Lata", cat: "Lata" },
    { id: 254, prov: 3, nombre: "Powerade Azul Zero 50cl", cat: "Botella 50cl" },
    { id: 255, prov: 3, nombre: "Fuze Tea Mango Piña 50cl", cat: "Botella 50cl" },
    { id: 256, prov: 3, nombre: "Fuze Tea Maracuyá 50cl", cat: "Botella 50cl" },
    { id: 257, prov: 3, nombre: "Fuze Tea Limón 1.5L", cat: "Botella 1.5L" },
    { id: 258, prov: 3, nombre: "Monster Ripper Amarillo", cat: "Monster" },
    { id: 259, prov: 3, nombre: "Monster Manzana", cat: "Monster" },
    { id: 260, prov: 3, nombre: "Monster Ultra Paradise", cat: "Monster" },
    { id: 261, prov: 3, nombre: "Monster Viking Nuevo", cat: "Monster" },
    { id: 262, prov: 3, nombre: "Monster Azul Zero", cat: "Monster" },
    { id: 263, prov: 3, nombre: "Monster Rio Punch", cat: "Monster" },
    { id: 264, prov: 3, nombre: "Monster Ultra Fantasy Ruby Red", cat: "Monster Ultra" },
    { id: 265, prov: 3, nombre: "Monster Ultra Strawberry Dreams", cat: "Monster Ultra" },
    { id: 266, prov: 3, nombre: "Monster Ultra Peachy Keen", cat: "Monster Ultra" },
    { id: 267, prov: 3, nombre: "Monster Ultra Rosa", cat: "Monster Ultra" },
    { id: 268, prov: 3, nombre: "Monster Ultra Gold", cat: "Monster Ultra" },
    { id: 269, prov: 3, nombre: "Monster Ultra Fiesta Punch", cat: "Monster Ultra" },
    { id: 270, prov: 3, nombre: "Monster Ultra Red", cat: "Monster Ultra" },
    { id: 271, prov: 3, nombre: "Monster Juiced Fiking Berry", cat: "Monster Juiced" },
    { id: 272, prov: 3, nombre: "Monster Juiced Mixxd", cat: "Monster Juiced" },
    { id: 273, prov: 3, nombre: "Monster Juiced Monarch", cat: "Monster Juiced" },
    { id: 274, prov: 3, nombre: "Monster Juiced Ripper", cat: "Monster Juiced" },
    { id: 275, prov: 3, nombre: "Monster Juiced Khaotic", cat: "Monster Juiced" },
    { id: 276, prov: 3, nombre: "Monster Full Throttle", cat: "Monster Additions" },
    { id: 277, prov: 3, nombre: "Monster Rehab Té Limón", cat: "Monster Additions" },
    { id: 278, prov: 3, nombre: "Monster Rehab Té Melocotón", cat: "Monster Additions" },
    { id: 279, prov: 3, nombre: "Monster Rehab Té Mixed Berry", cat: "Monster Additions" },
    { id: 280, prov: 3, nombre: "Burn Original", cat: "Burn" },
    { id: 281, prov: 3, nombre: "Bang Peach Mango", cat: "Bang" },
    { id: 282, prov: 3, nombre: "Bang Black Cherry Vanilla", cat: "Bang" },
    { id: 283, prov: 3, nombre: "Bang Blue Razz", cat: "Bang" },
    { id: 284, prov: 3, nombre: "Bang Cotton Candy", cat: "Bang" },
    { id: 285, prov: 3, nombre: "Powerade Centro Campista", cat: "Powerade Estilos" },
    { id: 286, prov: 3, nombre: "Powerade Delantero Naranja Fuego", cat: "Powerade Estilos" },
    { id: 287, prov: 3, nombre: "Powerade Defensa Hibiscus", cat: "Powerade Estilos" },
    { id: 288, prov: 3, nombre: "Bodyarmor Lyte Sandía", cat: "Bodyarmor" },
    { id: 289, prov: 3, nombre: "Bodyarmor Lyte Coco-Limón", cat: "Bodyarmor" },
    { id: 290, prov: 3, nombre: "Bodyarmor Lyte Citrus", cat: "Bodyarmor" },
    { id: 230, prov: 3, nombre: "Monster Verde", cat: "Monster" },
    { id: 231, prov: 3, nombre: "Monster Viking", cat: "Monster" },
    { id: 232, prov: 3, nombre: "Monster Ultra Fresa", cat: "Monster" },
    { id: 233, prov: 3, nombre: "Monster Sandía", cat: "Monster" },
    { id: 234, prov: 3, nombre: "Monster Mango Loco", cat: "Monster" },
    { id: 235, prov: 3, nombre: "Monster Blanco", cat: "Monster" },
    { id: 236, prov: 3, nombre: "Monster Fresa", cat: "Monster" },
    { id: 301, prov: 4, nombre: "Font Vella 50cl", cat: "Agua" },
    { id: 302, prov: 4, nombre: "Font Vella 1.5L", cat: "Agua" },
    { id: 303, prov: 4, nombre: "Evian 1.5L", cat: "Agua" },
    { id: 304, prov: 4, nombre: "Pepsi 50cl", cat: "Refrescos" },
    { id: 305, prov: 4, nombre: "Pepsi 1.5L", cat: "Refrescos" },
    { id: 306, prov: 4, nombre: "Pepsi Max 1.5L", cat: "Refrescos" },
    { id: 307, prov: 4, nombre: "7UP Normal 50cl", cat: "Refrescos" },
    { id: 308, prov: 4, nombre: "7UP Normal 1.5L", cat: "Refrescos" },
    { id: 309, prov: 4, nombre: "7UP Free 1.5L", cat: "Refrescos" },
    { id: 310, prov: 4, nombre: "Schweppes Naranja 1.5L", cat: "Refrescos" },
    { id: 311, prov: 4, nombre: "Gatorade Azul", cat: "Isotónicas" },
    { id: 312, prov: 4, nombre: "Lipton Limón Lata", cat: "Té" },
    { id: 313, prov: 4, nombre: "Lipton Maracuyá 1L", cat: "Té" },
    { id: 314, prov: 4, nombre: "Juver Tropical 1L", cat: "Zumos" },
    { id: 315, prov: 4, nombre: "Juver Tomate 1L", cat: "Zumos" },
    { id: 316, prov: 4, nombre: "Leche Asturiana Desnatada 1L", cat: "Lácteos" },
    { id: 317, prov: 4, nombre: "Okey Chocolate Grande", cat: "Snacks" },
    { id: 318, prov: 4, nombre: "Beefeater Pink Lata", cat: "RTD" },
    { id: 319, prov: 4, nombre: "Malibu Piña Colada Lata", cat: "RTD" },
    { id: 320, prov: 4, nombre: "Jameson Lata", cat: "RTD" },
    // ALFRAN TABACO - Nuevos accesorios
    { id: 452, prov: 1, nombre: "Smoking Filters Slim Azul 180", cat: "Accesorios" },
    { id: 453, prov: 1, nombre: "Smoking Menthol Filters Slim Verde 120", cat: "Accesorios" },
    // COSTASUR - Nuevos
    { id: 700, prov: 2, nombre: "Hendricks Gin 70cl", cat: "Ginebra" },
    { id: 701, prov: 2, nombre: "Gordon's 35cl", cat: "Ginebra" },
    { id: 702, prov: 2, nombre: "Vodka Finlandia 1L", cat: "Vodka" },
    { id: 703, prov: 2, nombre: "Absolut Mango 1L", cat: "Vodka" },
    { id: 704, prov: 2, nombre: "Smirnoff Vodka 35cl Petaca", cat: "Vodka" },
    { id: 705, prov: 2, nombre: "Grey Goose 20cl", cat: "Vodka" },
    { id: 706, prov: 2, nombre: "Miniatura Bombay Sapphire", cat: "Miniaturas" },
    { id: 707, prov: 2, nombre: "Ron Brugal 70cl", cat: "Ron" },
    { id: 708, prov: 2, nombre: "Miniatura Ron Bacardi", cat: "Miniaturas" },
    { id: 709, prov: 2, nombre: "Havana Club 7 70cl", cat: "Ron" },
    { id: 710, prov: 2, nombre: "JB 1L", cat: "Whisky" },
    { id: 711, prov: 2, nombre: "Red Label 20cl", cat: "Whisky" },
    { id: 712, prov: 2, nombre: "Jameson 35cl", cat: "Whisky" },
    { id: 713, prov: 2, nombre: "Disaronno 70cl", cat: "Licores" },
    { id: 714, prov: 2, nombre: "Mojito Trinidad 70cl", cat: "Licores" },
    { id: 715, prov: 2, nombre: "Licor Plátano Ucanca 50cl", cat: "Licores" },
    { id: 716, prov: 2, nombre: "Martini Bianco 1L", cat: "Licores" },
    { id: 717, prov: 2, nombre: "Irish Pasture 1L", cat: "Licores" },
    { id: 718, prov: 2, nombre: "Faustino VII Tinto", cat: "Vino" },
    { id: 719, prov: 2, nombre: "Faustino VII Blanco", cat: "Vino" },
    { id: 720, prov: 2, nombre: "Campo Viejo Crianza", cat: "Vino" },
    { id: 721, prov: 2, nombre: "Los Molinos Blanco 75cl", cat: "Vino" },
    { id: 722, prov: 2, nombre: "Viña Sol Grande", cat: "Vino" },
    { id: 723, prov: 2, nombre: "Vino Bach Rosado", cat: "Vino" },
    { id: 724, prov: 2, nombre: "JP Chenet Rojo 200ml", cat: "Vino" },
    { id: 725, prov: 2, nombre: "Barefoot Rosado", cat: "Vino" },
    { id: 726, prov: 2, nombre: "Los Molinos Rosado 75cl", cat: "Vino" },
    { id: 727, prov: 2, nombre: "Miniatura Viña Sol 187ml", cat: "Miniaturas" },
    { id: 728, prov: 2, nombre: "Miniatura Faustino VII 187ml Tinto", cat: "Miniaturas" },
    { id: 729, prov: 2, nombre: "Passoa Latas 25cl", cat: "RTD" },
    { id: 730, prov: 2, nombre: "Clipper Fresa Lata", cat: "RTD" },
    { id: 731, prov: 2, nombre: "Dorada Limón Lata", cat: "Cerveza" },
    { id: 732, prov: 2, nombre: "Kopparberg Fresa Lima 50cl", cat: "Cerveza" },
    { id: 733, prov: 2, nombre: "Don Simón Multifrutas 1L", cat: "Zumos" },
    { id: 734, prov: 2, nombre: "Don Simón Manzana 1L", cat: "Zumos" },
    { id: 735, prov: 2, nombre: "Powerking Manzana 250ml", cat: "Energéticas" },
    { id: 736, prov: 2, nombre: "Tabasco 60ml", cat: "Otros" },
    { id: 737, prov: 2, nombre: "Ribeira Atún Aceite Girasol Pack 3x70g", cat: "Conservas" },
    // KERO SUR
    { id: 800, prov: 6, nombre: "Kinder T4", cat: "Kinder" },
    { id: 801, prov: 6, nombre: "Kinder T8", cat: "Kinder" },
    { id: 802, prov: 6, nombre: "Kinder Crispy", cat: "Kinder" },
    { id: 803, prov: 6, nombre: "Kinder Bueno Dark", cat: "Kinder" },
    { id: 804, prov: 6, nombre: "Kinder Bueno Bajando", cat: "Kinder" },
    { id: 805, prov: 6, nombre: "Kinder Bueno Normal", cat: "Kinder" },
    { id: 806, prov: 6, nombre: "Kinder Bueno Blanco", cat: "Kinder" },
    { id: 807, prov: 6, nombre: "Kinder Kinderini", cat: "Kinder" },
    { id: 808, prov: 6, nombre: "Kinder Kinderini Formato Normal", cat: "Kinder" },
    { id: 809, prov: 6, nombre: "Kinder Kinderini Grande Formato", cat: "Kinder" },
    { id: 810, prov: 6, nombre: "Kinder Sorpresa", cat: "Kinder" },
    { id: 811, prov: 6, nombre: "Kinder Cards", cat: "Kinder" },
    { id: 812, prov: 6, nombre: "Kinder Delice", cat: "Kinder" },
    { id: 813, prov: 6, nombre: "Kinder Happy Hippo", cat: "Kinder" },
    { id: 814, prov: 6, nombre: "Kinder Country", cat: "Kinder" },
    { id: 815, prov: 6, nombre: "Kinder Duo Pack", cat: "Kinder" },
    { id: 816, prov: 6, nombre: "Kinder Biscuits Formato Pequeño", cat: "Kinder" },
    { id: 817, prov: 6, nombre: "Vimto Lata", cat: "Bebidas" },
    { id: 818, prov: 6, nombre: "Tango Apple Lata", cat: "Bebidas" },
    { id: 819, prov: 6, nombre: "Rubicon Mango Lata", cat: "Bebidas" },
    { id: 820, prov: 6, nombre: "Rubicon Passion Lata", cat: "Bebidas" },
    { id: 821, prov: 6, nombre: "Rubicon Passion Fruit Lata", cat: "Bebidas" },
    { id: 822, prov: 6, nombre: "Lucozade Botellas", cat: "Bebidas" },
    { id: 823, prov: 6, nombre: "Lucozade Rojo Botella", cat: "Bebidas" },
    { id: 824, prov: 6, nombre: "Lucozade Naranja Botella", cat: "Bebidas" },
    { id: 825, prov: 6, nombre: "Lucozade Original Botella", cat: "Bebidas" },
    { id: 826, prov: 6, nombre: "Irn Bru Lata", cat: "Bebidas" },
    { id: 827, prov: 6, nombre: "Irn Bru Sin Azúcar Lata", cat: "Bebidas" },
    { id: 828, prov: 6, nombre: "Irn Bru Botellas 50cl", cat: "Bebidas" },
    { id: 829, prov: 6, nombre: "Coca Cola Cherry Lata", cat: "Bebidas" },
    { id: 830, prov: 6, nombre: "Pepsi Max Cherry Lata", cat: "Bebidas" },
    { id: 831, prov: 6, nombre: "Dr Pepper Lata", cat: "Bebidas" },
    { id: 832, prov: 6, nombre: "Dr Pepper Cherry Lata", cat: "Bebidas" },
    { id: 833, prov: 6, nombre: "Barr Cream Soda Lata", cat: "Bebidas" },
    { id: 834, prov: 6, nombre: "Le Coq Mojito", cat: "Bebidas" },
    { id: 835, prov: 6, nombre: "Le Coq Cosmopolitan", cat: "Bebidas" },
    { id: 836, prov: 6, nombre: "Le Coq Piña Colada", cat: "Bebidas" },
    { id: 837, prov: 6, nombre: "Le Coq Blue Lagoon", cat: "Bebidas" },
    { id: 838, prov: 6, nombre: "Le Coq Sex on the Beach", cat: "Bebidas" },
    { id: 839, prov: 6, nombre: "Le Coq Cuba Libre", cat: "Bebidas" },
    { id: 840, prov: 6, nombre: "Le Coq Margarita", cat: "Bebidas" },
    { id: 841, prov: 6, nombre: "Le Coq Tequila", cat: "Bebidas" },
    { id: 842, prov: 6, nombre: "Calypso Kiwi Lemonade", cat: "Bebidas" },
    { id: 843, prov: 6, nombre: "Calypso Pineapple Lemonade", cat: "Bebidas" },
    { id: 844, prov: 6, nombre: "Calypso Blue Lemonade", cat: "Bebidas" },
    { id: 845, prov: 6, nombre: "Calypso Triple Melon Lemonade", cat: "Bebidas" },
    { id: 846, prov: 6, nombre: "Calypso Original Lemonade", cat: "Bebidas" },
    { id: 847, prov: 6, nombre: "Calypso Strawberry Lemonade", cat: "Bebidas" },
    { id: 848, prov: 6, nombre: "Fruit Shoot Naranja", cat: "Bebidas" },
    { id: 849, prov: 6, nombre: "Fruit Shoot Blackcurrant", cat: "Bebidas" },
    { id: 850, prov: 6, nombre: "Fruit Shoot Summer Fruits", cat: "Bebidas" },
    { id: 851, prov: 6, nombre: "Robinsons Blackcurrant", cat: "Bebidas" },
    { id: 852, prov: 6, nombre: "Robinsons Naranja", cat: "Bebidas" },
    { id: 853, prov: 6, nombre: "Robinsons Summer Fruits", cat: "Bebidas" },
    { id: 854, prov: 6, nombre: "Mars Batido", cat: "Bebidas" },
    { id: 855, prov: 6, nombre: "Snickers Batido", cat: "Bebidas" },
    { id: 856, prov: 6, nombre: "Milky Way Batido", cat: "Bebidas" },
    { id: 857, prov: 6, nombre: "MMs Amarillo Batido", cat: "Bebidas" },
    { id: 858, prov: 6, nombre: "Bounty Batido", cat: "Bebidas" },
    { id: 859, prov: 6, nombre: "Maltesers Batido", cat: "Bebidas" },
    { id: 860, prov: 6, nombre: "Evian Sport", cat: "Agua" },
    { id: 861, prov: 6, nombre: "Agua Macb Limón", cat: "Agua" },
    { id: 862, prov: 6, nombre: "Agua Macb Fresa", cat: "Agua" },
    { id: 863, prov: 6, nombre: "Agua Macb Blackcurrant", cat: "Agua" },
    { id: 864, prov: 6, nombre: "Agua San Pellegrino 50cl", cat: "Agua" },
    { id: 865, prov: 6, nombre: "Agua San Pellegrino 1L Plástico", cat: "Agua" },
    { id: 866, prov: 6, nombre: "Mr Chek Pop Cheese Onion", cat: "Snacks" },
    { id: 867, prov: 6, nombre: "Mr Chek Onion Ring", cat: "Snacks" },
    { id: 868, prov: 6, nombre: "Mr Chek Sour Cream", cat: "Snacks" },
    { id: 869, prov: 6, nombre: "Mr Chek Wavy Sour Cream", cat: "Snacks" },
    { id: 870, prov: 6, nombre: "Mr Chek Twist Sour Cream", cat: "Snacks" },
    { id: 871, prov: 6, nombre: "Mr Chek Pop Corn", cat: "Snacks" },
    { id: 872, prov: 6, nombre: "Mr Chek Wavy Bacon", cat: "Snacks" },
    { id: 873, prov: 6, nombre: "Pringles Pequeña Barbacoa", cat: "Snacks" },
    { id: 874, prov: 6, nombre: "Pringles Pequeña Paprika", cat: "Snacks" },
    { id: 875, prov: 6, nombre: "Pringles Pequeña Sour Cream", cat: "Snacks" },
    { id: 876, prov: 6, nombre: "Pringles Pequeña Original", cat: "Snacks" },
    { id: 877, prov: 6, nombre: "Pringles Pequeña Sal Vinagre", cat: "Snacks" },
    { id: 878, prov: 6, nombre: "Pringles Grande Sour Cream", cat: "Snacks" },
    { id: 879, prov: 6, nombre: "Pringles Grande Paprika", cat: "Snacks" },
    { id: 880, prov: 6, nombre: "Pringles Grande Original", cat: "Snacks" },
    { id: 881, prov: 6, nombre: "Pringles Grande Sal Vinagre", cat: "Snacks" },
    { id: 882, prov: 6, nombre: "Pringles Grande Jamón", cat: "Snacks" },
    { id: 883, prov: 6, nombre: "Soleo Sticks Sal", cat: "Snacks" },
    { id: 884, prov: 6, nombre: "Soleo Sticks Sésamo", cat: "Snacks" },
    { id: 885, prov: 6, nombre: "Soleo Sticks Clásica", cat: "Snacks" },
    { id: 886, prov: 6, nombre: "Soleo Pretzels", cat: "Snacks" },
    { id: 887, prov: 6, nombre: "Soleo Pretzels Saladas", cat: "Snacks" },
    { id: 888, prov: 6, nombre: "Soleo Snack Mix Bolsa 200g", cat: "Snacks" },
    { id: 889, prov: 6, nombre: "Soleo Snack Mix Bote 300g", cat: "Snacks" },
    { id: 890, prov: 6, nombre: "Poco Loco Salsa Dip", cat: "Snacks" },
    { id: 891, prov: 6, nombre: "Grissini Amor di Pane Clásico", cat: "Snacks" },
    { id: 892, prov: 6, nombre: "Grissini Amor di Pane Sésamo", cat: "Snacks" },
    { id: 893, prov: 6, nombre: "Nutella Biscuits", cat: "Galletas" },
    { id: 894, prov: 6, nombre: "Nutella Biscuits Formato Pequeño", cat: "Galletas" },
    { id: 895, prov: 6, nombre: "Nutella Go", cat: "Galletas" },
    { id: 896, prov: 6, nombre: "Galletas Fox Azul", cat: "Galletas" },
    { id: 897, prov: 6, nombre: "Galletas Fox Blancas", cat: "Galletas" },
    { id: 898, prov: 6, nombre: "Galletas Fig Rolls", cat: "Galletas" },
    { id: 899, prov: 6, nombre: "Galletas London Digestive", cat: "Galletas" },
    { id: 900, prov: 6, nombre: "London Rich Tea", cat: "Galletas" },
    { id: 901, prov: 6, nombre: "Tableta Chocolate Dubai", cat: "Chocolate" },
    { id: 902, prov: 6, nombre: "Reese's Nutragenous", cat: "Chocolate" },
    { id: 903, prov: 6, nombre: "Trolli Cola", cat: "Chocolate" },
    { id: 904, prov: 6, nombre: "Trolli Apple", cat: "Chocolate" },
    { id: 905, prov: 6, nombre: "Trolli Shark", cat: "Chocolate" },
    { id: 906, prov: 6, nombre: "Trolli Peach", cat: "Chocolate" },
    { id: 907, prov: 6, nombre: "Trolli Burger", cat: "Chocolate" },
    { id: 908, prov: 6, nombre: "Trolli Sour Octopus", cat: "Chocolate" },
    { id: 909, prov: 6, nombre: "Trolli Kiss Fresa", cat: "Chocolate" },
    { id: 910, prov: 6, nombre: "Trolli Cherry Twins", cat: "Chocolate" },
    { id: 911, prov: 6, nombre: "Trolli Pizza", cat: "Chocolate" },
    { id: 912, prov: 6, nombre: "Trolli Banana", cat: "Chocolate" },
    { id: 913, prov: 6, nombre: "Trolli Wild Strawberry", cat: "Chocolate" },
    { id: 914, prov: 6, nombre: "Trolli Bears", cat: "Chocolate" },
    { id: 915, prov: 6, nombre: "Trolli Blob", cat: "Chocolate" },
    { id: 916, prov: 6, nombre: "Trolli Pinguin", cat: "Chocolate" },
    { id: 917, prov: 6, nombre: "Trolli Octopus Normal", cat: "Chocolate" },
    { id: 918, prov: 6, nombre: "Trolli Catz", cat: "Chocolate" },
    { id: 919, prov: 6, nombre: "Trolli Sandía", cat: "Chocolate" },
    { id: 920, prov: 6, nombre: "Trolli Red Fruits Ring", cat: "Chocolate" },
    { id: 921, prov: 6, nombre: "Trolli Dracula", cat: "Chocolate" },
    { id: 922, prov: 6, nombre: "Trolli Kiss Minis", cat: "Chocolate" },
    { id: 923, prov: 6, nombre: "Millions Tube Vimto", cat: "Chocolate" },
    { id: 924, prov: 6, nombre: "Millions Tube Fresa", cat: "Chocolate" },
    { id: 925, prov: 6, nombre: "Millions Tube Blackcurrant", cat: "Chocolate" },
    { id: 926, prov: 6, nombre: "Millions Tube Strawberry", cat: "Chocolate" },
    { id: 927, prov: 6, nombre: "Heinz Tomato Soup", cat: "Alimentación" },
    { id: 928, prov: 6, nombre: "Heinz Minestrone Soup", cat: "Alimentación" },
    { id: 929, prov: 6, nombre: "Heinz Mushroom Soup", cat: "Alimentación" },
    { id: 930, prov: 6, nombre: "Heinz Beans Lata", cat: "Alimentación" },
    { id: 931, prov: 6, nombre: "Heinz Beans Salchicha", cat: "Alimentación" },
    { id: 932, prov: 6, nombre: "Heinz Soja", cat: "Alimentación" },
    { id: 933, prov: 6, nombre: "Heinz Mayonesa", cat: "Alimentación" },
    { id: 934, prov: 6, nombre: "Yorkshire Tea", cat: "Alimentación" },
    { id: 935, prov: 6, nombre: "Té PG", cat: "Alimentación" },
    { id: 936, prov: 6, nombre: "Té Typhoo", cat: "Alimentación" },
    { id: 937, prov: 6, nombre: "Nescafé Gold 50g", cat: "Alimentación" },
    { id: 938, prov: 6, nombre: "Supernoodles Chicken", cat: "Alimentación" },
    { id: 939, prov: 6, nombre: "Supernoodles Chow Mein", cat: "Alimentación" },
    { id: 940, prov: 6, nombre: "Pot Noodles Verde", cat: "Alimentación" },
    { id: 941, prov: 6, nombre: "Pot Noodles Curry", cat: "Alimentación" },
    { id: 942, prov: 6, nombre: "Pot Noodles Bombay", cat: "Alimentación" },
    { id: 943, prov: 6, nombre: "Pot Noodles Chicken", cat: "Alimentación" },
    { id: 944, prov: 6, nombre: "Tate Lyle Azúcar", cat: "Alimentación" },
    { id: 945, prov: 6, nombre: "Silver Spoon Azúcar en Cubitos", cat: "Alimentación" },
    { id: 946, prov: 6, nombre: "Aceite KTC", cat: "Alimentación" },
    { id: 947, prov: 6, nombre: "Colmans Horse Radish", cat: "Alimentación" },
    { id: 948, prov: 6, nombre: "Sun Pat Crunchy", cat: "Alimentación" },
    { id: 949, prov: 6, nombre: "Hartleys Raspberry Jam", cat: "Alimentación" },
    { id: 950, prov: 6, nombre: "Harley's Strawberry Jam", cat: "Alimentación" },
    { id: 951, prov: 6, nombre: "Lyons Cappuccino Caja Roja", cat: "Café" },
    { id: 952, prov: 6, nombre: "Lyons Cappuccino Unsweetened", cat: "Café" },
    { id: 953, prov: 6, nombre: "Lyons Mochaccino", cat: "Café" },
    { id: 954, prov: 6, nombre: "Lyon Cafe", cat: "Café" },
    { id: 955, prov: 6, nombre: "Melitta Filtros Nº2", cat: "Café" },
    { id: 956, prov: 6, nombre: "Melitta Filtros Nº4", cat: "Café" },
    { id: 957, prov: 6, nombre: "Lunetta Prosecco Rosado Mini 200ml", cat: "Vino" },
    { id: 958, prov: 6, nombre: "Lunetta Prosecco Original Grande", cat: "Vino" },
    { id: 959, prov: 6, nombre: "Principato Tinto", cat: "Vino" },
    { id: 960, prov: 6, nombre: "I Heart Chardonnay", cat: "Vino" },
    { id: 961, prov: 6, nombre: "I Heart Pinot Grigio", cat: "Vino" },
    { id: 962, prov: 6, nombre: "Compresas Essence Rosas", cat: "Higiene" },
    { id: 963, prov: 6, nombre: "Compresas Essence Azul", cat: "Higiene" },
    { id: 964, prov: 6, nombre: "Compresas Essence Verde", cat: "Higiene" },
    { id: 965, prov: 6, nombre: "Compresas Essence Violetas", cat: "Higiene" },
    { id: 966, prov: 6, nombre: "Lil Lets Rosado", cat: "Higiene" },
    { id: 967, prov: 6, nombre: "Dove Gel Ducha", cat: "Higiene" },
    { id: 968, prov: 6, nombre: "Enliven Acondicionador Raspberry", cat: "Higiene" },
    { id: 969, prov: 6, nombre: "Dr Beckman Travel Wash", cat: "Higiene" },
    // GALAGO
    { id: 1000, prov: 7, nombre: "Bezoya 1.5L", cat: "Agua" },
    { id: 1001, prov: 7, nombre: "Bezoya 50cl", cat: "Agua" },
    { id: 1002, prov: 7, nombre: "Yogur Natural Pascual", cat: "Yogur" },
    { id: 1003, prov: 7, nombre: "Yogur Desnatado Fresa Pascual", cat: "Yogur" },
    { id: 1004, prov: 7, nombre: "Yogur Pascual Fresa Plátano", cat: "Yogur" },
    { id: 1005, prov: 7, nombre: "Yogur Pascual Big Day Fresa", cat: "Yogur" },
    { id: 1006, prov: 7, nombre: "Yogur Pascual Big Day Frutas Bosque", cat: "Yogur" },
    { id: 1007, prov: 7, nombre: "Yogur Pascual Fresa", cat: "Yogur" },
    { id: 1008, prov: 7, nombre: "Galletas McVities Chocolate", cat: "Galletas" },
    { id: 1009, prov: 7, nombre: "Galletas McVities Original Formato Pequeño", cat: "Galletas" },
    { id: 1010, prov: 7, nombre: "Galletas McVities Original Rojo Pequeño", cat: "Galletas" },
    { id: 1011, prov: 7, nombre: "McVities Hobnobs 255g", cat: "Galletas" },
    { id: 1012, prov: 7, nombre: "Galletas Jacobs Cream Crackers", cat: "Galletas" },
    { id: 1013, prov: 7, nombre: "Weetabix 215g", cat: "Cereales" },
    { id: 1014, prov: 7, nombre: "Barritas Flake", cat: "Chocolate" },
    { id: 1015, prov: 7, nombre: "Salsa Old El Paso Queso", cat: "Alimentación" },
    { id: 1016, prov: 7, nombre: "Salsa Old El Paso Picante", cat: "Alimentación" },
    { id: 1017, prov: 7, nombre: "Salsa Old El Paso Guacamole", cat: "Alimentación" },
    { id: 1018, prov: 7, nombre: "Nestea Mango Piña 50cl", cat: "Bebidas" },
    { id: 1019, prov: 7, nombre: "Nestea Limón 50cl", cat: "Bebidas" },
    { id: 1020, prov: 7, nombre: "Nestea Melocotón 50cl", cat: "Bebidas" },
    { id: 1021, prov: 7, nombre: "Hero Baby Compota Arroz con Pollo 235g", cat: "Infantil" },
    // CREFUSA
    { id: 1100, prov: 8, nombre: "TBEST Aloe Vera Original", cat: "Aloe Vera" },
    { id: 1101, prov: 8, nombre: "TBEST Aloe Vera Uva", cat: "Aloe Vera" },
    { id: 1102, prov: 8, nombre: "TBEST Aloe Vera Mango", cat: "Aloe Vera" },
    { id: 1103, prov: 8, nombre: "TBEST Aloe Vera Fresa", cat: "Aloe Vera" },
    { id: 1104, prov: 8, nombre: "TBEST Aloe Vera Coco", cat: "Aloe Vera" },
    { id: 1105, prov: 8, nombre: "Piponazo Pipas", cat: "Pipas y Snacks" },
    { id: 1106, prov: 8, nombre: "Snatts Pipas", cat: "Pipas y Snacks" },
    { id: 1107, prov: 8, nombre: "Snatts Queso", cat: "Pipas y Snacks" },
    { id: 1108, prov: 8, nombre: "Galletas Asinez", cat: "Galletas" },
    { id: 1109, prov: 8, nombre: "Happy Swing Palitos Cacao", cat: "Happy Swing" },
    { id: 1110, prov: 8, nombre: "Happy Swing Palitos Brownie", cat: "Happy Swing" },
    { id: 1111, prov: 8, nombre: "Happy Swing Palitos Avellana", cat: "Happy Swing" },
    { id: 1112, prov: 8, nombre: "Happy Swing Palitos Pistacho", cat: "Happy Swing" },
    { id: 1113, prov: 8, nombre: "Happy Swing Palitos Coco", cat: "Happy Swing" },
    { id: 1114, prov: 8, nombre: "Happy Swing Palitos Vainilla", cat: "Happy Swing" },
    // HUEVOS
    { id: 1200, prov: 9, nombre: "Huevos", cat: "Huevos" },
    // MYA TGT
    { id: 1300, prov: 10, nombre: "Pizza Jamón Queso", cat: "Pizza" },
    { id: 1301, prov: 10, nombre: "Pizza Peperoni", cat: "Pizza" },
    { id: 1302, prov: 10, nombre: "Jamón Cocido Extrajugoso", cat: "Jamón y Embutidos" },
    { id: 1303, prov: 10, nombre: "Jamón Cocido Finissimas", cat: "Jamón y Embutidos" },
    { id: 1304, prov: 10, nombre: "Jamón Curado Navidul", cat: "Jamón y Embutidos" },
    { id: 1305, prov: 10, nombre: "Paleta Cebo Ibérico", cat: "Jamón y Embutidos" },
    { id: 1306, prov: 10, nombre: "Salami Revilla", cat: "Jamón y Embutidos" },
    { id: 1307, prov: 10, nombre: "Chorizo Revilla", cat: "Jamón y Embutidos" },
    { id: 1308, prov: 10, nombre: "Salchichón Revilla", cat: "Jamón y Embutidos" },
    { id: 1309, prov: 10, nombre: "Mini Fuet Snacking", cat: "Jamón y Embutidos" },
    { id: 1310, prov: 10, nombre: "Mini Fuet Chorizo", cat: "Jamón y Embutidos" },
    { id: 1311, prov: 10, nombre: "Caña Lomo Navidul", cat: "Jamón y Embutidos" },
    { id: 1312, prov: 10, nombre: "Mortadela Clásica", cat: "Jamón y Embutidos" },
    { id: 1313, prov: 10, nombre: "Mortadela Aceitunas", cat: "Jamón y Embutidos" },
    { id: 1314, prov: 10, nombre: "Mortadela Pavo", cat: "Jamón y Embutidos" },
    { id: 1315, prov: 10, nombre: "Pechuga Pavo Extrajugoso", cat: "Jamón y Embutidos" },
    { id: 1316, prov: 10, nombre: "Chopped Pork", cat: "Jamón y Embutidos" },
    { id: 1317, prov: 10, nombre: "Longaniza Lonchas", cat: "Jamón y Embutidos" },
    { id: 1318, prov: 10, nombre: "Bacon Lonchas Oscar Mayer", cat: "Jamón y Embutidos" },
    { id: 1319, prov: 10, nombre: "Salchichas Oscar Mayer", cat: "Jamón y Embutidos" },
    { id: 1320, prov: 10, nombre: "Queso Sandwich Bocatería", cat: "Queso" },
    { id: 1321, prov: 10, nombre: "Queso Cheddar Bocatería", cat: "Queso" },
    { id: 1322, prov: 10, nombre: "Cremette Normal", cat: "Queso" },
    { id: 1323, prov: 10, nombre: "Cremette Hierbas", cat: "Queso" },
    { id: 1324, prov: 10, nombre: "Cuña Queso Cathedral", cat: "Queso" },
    { id: 1325, prov: 10, nombre: "Queso Aoste Edam", cat: "Queso" },
    { id: 1326, prov: 10, nombre: "Queso Aoste Gouda", cat: "Queso" },
    { id: 1327, prov: 10, nombre: "Surtido Quesos Navidul", cat: "Queso" },
    { id: 1328, prov: 10, nombre: "Queso Semicurado Navidul", cat: "Queso" },
    { id: 1329, prov: 10, nombre: "Mantequilla Clover", cat: "Mantequilla" },
    { id: 1330, prov: 10, nombre: "Mantequilla Willow", cat: "Mantequilla" },
    { id: 1331, prov: 10, nombre: "Mantequilla Utterly Butterly", cat: "Mantequilla" },
    { id: 1332, prov: 10, nombre: "Nata Spray", cat: "Mantequilla" },
    { id: 1333, prov: 10, nombre: "Ubach Kefir Natural", cat: "Lácteos" },
    { id: 1334, prov: 10, nombre: "Ubach Kefir", cat: "Lácteos" },
    { id: 1335, prov: 10, nombre: "Ubach Griego", cat: "Lácteos" },
    { id: 1336, prov: 10, nombre: "Ubach Yogur Natural", cat: "Lácteos" },
    // CASH DIPLO
    { id: 1400, prov: 11, nombre: "Nescafé Clásico Bote Cristal 50g", cat: "Café" },
    { id: 1401, prov: 11, nombre: "Nescafé Clásico Bote Cristal 100g", cat: "Café" },
    { id: 1402, prov: 11, nombre: "Nescafé Clásico Sobres Cartón 20g", cat: "Café" },
    { id: 1403, prov: 11, nombre: "Nescafé Descafeinado Bote Cristal 50g", cat: "Café" },
    { id: 1404, prov: 11, nombre: "Nescafé Descafeinado Sobres Cartón 20g", cat: "Café" },
    { id: 1405, prov: 11, nombre: "Nescafé Cappuccino Cajitas Cartón", cat: "Café" },
    { id: 1406, prov: 11, nombre: "Cápsulas Dolce Gusto Lungo", cat: "Café" },
    { id: 1407, prov: 11, nombre: "Cápsulas Dolce Gusto Café con Leche", cat: "Café" },
    { id: 1408, prov: 11, nombre: "Cápsulas Dolce Gusto Espresso Intenso", cat: "Café" },
    { id: 1409, prov: 11, nombre: "Gimoka Cápsulas Café Espresso Intenso", cat: "Café" },
    { id: 1410, prov: 11, nombre: "Gimoka Cápsulas Descafeinado", cat: "Café" },
    { id: 1411, prov: 11, nombre: "Gimoka Café Molido 250g Gusto Ricco", cat: "Café" },
    { id: 1412, prov: 11, nombre: "Gimoka Café Molido 250g Gran Relax", cat: "Café" },
    { id: 1413, prov: 11, nombre: "Gimoka Café Molido 250g Rojo", cat: "Café" },
    { id: 1414, prov: 11, nombre: "Cápsulas Marcilla Puro Arábica Colombia", cat: "Café" },
    { id: 1415, prov: 11, nombre: "Coffee Matte Completa Bote 200g", cat: "Café" },
    { id: 1416, prov: 11, nombre: "Lipton Té Yellow Label Clásico", cat: "Café" },
    { id: 1417, prov: 11, nombre: "Pompadour Manzanilla", cat: "Café" },
    { id: 1418, prov: 11, nombre: "Tila Pompadour Pack 10 Bolsitas", cat: "Café" },
    { id: 1419, prov: 11, nombre: "Nesquik Cereal", cat: "Cereales" },
    { id: 1420, prov: 11, nombre: "Nesquik Batido Bote 390g", cat: "Cereales" },
    { id: 1421, prov: 11, nombre: "Copos de Maíz Eliges 500g", cat: "Cereales" },
    { id: 1422, prov: 11, nombre: "Kellogg's Cereal Frosties", cat: "Cereales" },
    { id: 1423, prov: 11, nombre: "Kellogg's Krave", cat: "Cereales" },
    { id: 1424, prov: 11, nombre: "Milkybar Tableta 100g", cat: "Chocolate" },
    { id: 1425, prov: 11, nombre: "Crunch Tableta Chocolate 100g", cat: "Chocolate" },
    { id: 1426, prov: 11, nombre: "Philadelphia Normal 200g", cat: "Queso" },
    { id: 1427, prov: 11, nombre: "Philadelphia Light 200g", cat: "Queso" },
    { id: 1428, prov: 11, nombre: "Queso Cheddar Bocatería 100g Lonchas", cat: "Queso" },
    { id: 1429, prov: 11, nombre: "Queso Sandwich Bocatería 100g Lonchas", cat: "Queso" },
    { id: 1430, prov: 11, nombre: "La Vaca que Ríe Quesitos 125g", cat: "Queso" },
    { id: 1431, prov: 11, nombre: "Leche Condensada en Tubo La Lechera 170g", cat: "Lácteos" },
    { id: 1432, prov: 11, nombre: "Leche Condensada La Lechera 400g", cat: "Lácteos" },
    { id: 1433, prov: 11, nombre: "Leche de Coco Alpro 1L", cat: "Lácteos" },
    { id: 1434, prov: 11, nombre: "Sunny Naranja Grande", cat: "Bebidas" },
    { id: 1435, prov: 11, nombre: "Font Vella 1.5L", cat: "Agua" },
    { id: 1436, prov: 11, nombre: "Aceite Oliva Ybarra Bote 250ml", cat: "Aceites y Salsas" },
    { id: 1437, prov: 11, nombre: "Aceite Oliva Carbonell 250ml", cat: "Aceites y Salsas" },
    { id: 1438, prov: 11, nombre: "Mayonesa Ybarra Bote Cristal 225ml", cat: "Aceites y Salsas" },
    { id: 1439, prov: 11, nombre: "Mayonesa Hellmans Bote Cristal 225ml", cat: "Aceites y Salsas" },
    { id: 1440, prov: 11, nombre: "Vinagre de Vino Ybarra 500ml", cat: "Aceites y Salsas" },
    { id: 1441, prov: 11, nombre: "Salsa Boloñesa Helios", cat: "Aceites y Salsas" },
    { id: 1442, prov: 11, nombre: "Salsa Buitoni Napolitana", cat: "Aceites y Salsas" },
    { id: 1443, prov: 11, nombre: "Pescamar Atún Claro Aceite Girasol 110g", cat: "Conservas" },
    { id: 1444, prov: 11, nombre: "Pescamar Atún Aceite Oliva 110g", cat: "Conservas" },
    { id: 1445, prov: 11, nombre: "Pescamar Sardinillas Aceite Oliva 81g", cat: "Conservas" },
    { id: 1446, prov: 11, nombre: "Pescamar Mejillón Mojo Rojo", cat: "Conservas" },
    { id: 1447, prov: 11, nombre: "Aceitunas Negras con Hueso Coaliment Lata", cat: "Conservas" },
    { id: 1448, prov: 11, nombre: "Aceitunas con Manzanilla Coaliment Lata", cat: "Conservas" },
    { id: 1449, prov: 11, nombre: "Aceitunas Negra Coaliment Lata 350g", cat: "Conservas" },
    { id: 1450, prov: 11, nombre: "Aceitunas Anchoa La Española Lata", cat: "Conservas" },
    { id: 1451, prov: 11, nombre: "Aceitunas Pimiento La Española Lata 300g", cat: "Conservas" },
    { id: 1452, prov: 11, nombre: "Maíz Dulce Coaliment Pack 3", cat: "Conservas" },
    { id: 1453, prov: 11, nombre: "Garbanzos Coaliment Bote Cristal", cat: "Conservas" },
    { id: 1454, prov: 11, nombre: "Chispicat Lata 415g", cat: "Mascotas" },
    { id: 1455, prov: 11, nombre: "Chispicat Lata 1250g", cat: "Mascotas" },
    { id: 1456, prov: 11, nombre: "Chuspicat Tarrinas 100g", cat: "Mascotas" },
    { id: 1457, prov: 11, nombre: "IFA Tarrina Comida Gato 100g", cat: "Mascotas" },
    { id: 1458, prov: 11, nombre: "Chispican Lata 1250g Comida Perro", cat: "Mascotas" },
    { id: 1459, prov: 11, nombre: "Arroz Largo La Cigala 500g", cat: "Arroz" },
    { id: 1460, prov: 11, nombre: "Arroz Largo Coaliment 1kg", cat: "Arroz" },
    { id: 1461, prov: 11, nombre: "Arroz Basmati Brillante", cat: "Arroz" },
    { id: 1462, prov: 11, nombre: "Sal en Bote La Barraca 250g", cat: "Despensa" },
    { id: 1463, prov: 11, nombre: "Sal Zelva Bote 250g", cat: "Despensa" },
    { id: 1464, prov: 11, nombre: "Bicarbonato La Barraca 180g", cat: "Despensa" },
    { id: 1465, prov: 11, nombre: "Azúcar Moreno 500g", cat: "Despensa" },
    { id: 1466, prov: 11, nombre: "Miel Bonapi Bote Cristal 500g", cat: "Despensa" },
    { id: 1467, prov: 11, nombre: "Miel Bonapi Bote Plástico 350g", cat: "Despensa" },
    { id: 1468, prov: 11, nombre: "Miel Coaliment Bote Plástico", cat: "Despensa" },
    { id: 1469, prov: 11, nombre: "Sacarina Natreen 7.6g", cat: "Despensa" },
    { id: 1470, prov: 11, nombre: "Maggi Sopa de Pollo Sobres 82g", cat: "Despensa" },
    { id: 1471, prov: 11, nombre: "Maggi Sopa Verdura Sobres", cat: "Despensa" },
    { id: 1472, prov: 11, nombre: "Papel Higiénico Húmedo WC Coaliment", cat: "Despensa" },
    { id: 1473, prov: 11, nombre: "Hero Compota Bebé Bote Cristal 235g", cat: "Infantil" },
    { id: 1474, prov: 11, nombre: "Hero Frutas Variadas Compota", cat: "Infantil" },
    { id: 1475, prov: 11, nombre: "Hero Compota Verduras Pollo Ternera", cat: "Infantil" },
    { id: 1476, prov: 11, nombre: "Dodot Toallitas Básico Naranja", cat: "Infantil" },
    { id: 1477, prov: 11, nombre: "Lejía Conejo Amarillo 1L", cat: "Limpieza" },
    { id: 1478, prov: 11, nombre: "Alin Fregasuelos Limón 1.5L", cat: "Limpieza" },
    { id: 1479, prov: 11, nombre: "Alin Fregasuelos Pino 1.5L", cat: "Limpieza" },
    { id: 1480, prov: 11, nombre: "Alin Fregasuelos Floral 1.5L", cat: "Limpieza" },
    { id: 1481, prov: 11, nombre: "Alin Fregasuelos Marino 1.5L", cat: "Limpieza" },
    { id: 1482, prov: 11, nombre: "Flota Detergente Líquido Oceánico", cat: "Limpieza" },
    { id: 1483, prov: 11, nombre: "Flota Lavavajillas Verde 750ml", cat: "Limpieza" },
    { id: 1484, prov: 11, nombre: "Champú Amalfi Almendras 400ml", cat: "Higiene" },
    { id: 1485, prov: 11, nombre: "Champú Amalfi Aloe Vera 400ml", cat: "Higiene" },
    { id: 1486, prov: 11, nombre: "Amalfi Aloe Vera Tubo 150ml", cat: "Higiene" },
    { id: 1487, prov: 11, nombre: "Amalfi Tarro Aloe Vera 250ml", cat: "Higiene" },
    { id: 1488, prov: 11, nombre: "Amalfi Mascarilla Pelo Verde 500ml", cat: "Higiene" },
    { id: 1489, prov: 11, nombre: "Amalfi Espuma Pelo 200ml", cat: "Higiene" },
    // MEGA VAPERS
    { id: 1500, prov: 12, nombre: "Lost Mary 600 Blueberry", cat: "Lost Mary 600" },
    { id: 1501, prov: 12, nombre: "Lost Mary 600 Watermelon Ice", cat: "Lost Mary 600" },
    { id: 1502, prov: 12, nombre: "Lost Mary 600 Cotton Candy Ice", cat: "Lost Mary 600" },
    { id: 1503, prov: 12, nombre: "Lost Mary 600 Blue Razz Ice", cat: "Lost Mary 600" },
    { id: 1504, prov: 12, nombre: "Lost Mary 600 Kiwi Passion Fruit Guava", cat: "Lost Mary 600" },
    { id: 1505, prov: 12, nombre: "Lost Mary 600 Blueberry Sour Raspberry", cat: "Lost Mary 600" },
    { id: 1506, prov: 12, nombre: "Lost Mary 600 Triple Mango", cat: "Lost Mary 600" },
    { id: 1507, prov: 12, nombre: "Lost Mary 600 Cherry Ice", cat: "Lost Mary 600" },
    { id: 1508, prov: 12, nombre: "Lost Mary 600 Berry Combos", cat: "Lost Mary 600" },
    { id: 1509, prov: 12, nombre: "Lost Mary 600 Piña Kiwi Lemonade", cat: "Lost Mary 600" },
    { id: 1510, prov: 12, nombre: "Lost Mary 600 Straw Golden Piña", cat: "Lost Mary 600" },
    { id: 1511, prov: 12, nombre: "Lost Mary 600 Apple Watermelon", cat: "Lost Mary 600" },
    { id: 1512, prov: 12, nombre: "Lost Mary 600 Lemon Lime", cat: "Lost Mary 600" },
    { id: 1513, prov: 12, nombre: "Lost Mary 600 Triple Melon", cat: "Lost Mary 600" },
    { id: 1514, prov: 12, nombre: "Lost Mary 600 Blue Razz Cherry", cat: "Lost Mary 600" },
    { id: 1515, prov: 12, nombre: "Lost Mary 600 Menthol", cat: "Lost Mary 600" },
    { id: 1516, prov: 12, nombre: "Lost Mary 600 Grape", cat: "Lost Mary 600" },
    { id: 1517, prov: 12, nombre: "Lost Mary 600 Pink Lemonade", cat: "Lost Mary 600" },
    { id: 1518, prov: 12, nombre: "Lost Mary 600 Pineapple Ice", cat: "Lost Mary 600" },
    { id: 1519, prov: 12, nombre: "Lost Mary 600 Strawberry Ice", cat: "Lost Mary 600" },
    { id: 1520, prov: 12, nombre: "Lost Mary 600 Double Apple", cat: "Lost Mary 600" },
    { id: 1521, prov: 12, nombre: "Lost Mary 600 Juicy Peach", cat: "Lost Mary 600" },
    { id: 1522, prov: 12, nombre: "Lost Mary 600 Strawberry Kiwi", cat: "Lost Mary 600" },
    { id: 1523, prov: 12, nombre: "Lost Mary 600 Watermelon Strawberry Ice", cat: "Lost Mary 600" },
    { id: 1524, prov: 12, nombre: "Lost Mary 600 Strawberry Raspberry Cherry Ice", cat: "Lost Mary 600" },
    { id: 1525, prov: 12, nombre: "Lost Mary 1000 Blueberry", cat: "Lost Mary 1000" },
    { id: 1526, prov: 12, nombre: "Lost Mary 1000 Cherry Ice", cat: "Lost Mary 1000" },
    { id: 1527, prov: 12, nombre: "Lost Mary 1000 Cola", cat: "Lost Mary 1000" },
    { id: 1528, prov: 12, nombre: "Lost Mary 1000 Strawberry Ice", cat: "Lost Mary 1000" },
    { id: 1529, prov: 12, nombre: "Lost Mary 1000 Watermelon Ice", cat: "Lost Mary 1000" },
    { id: 1530, prov: 12, nombre: "Lost Mary 1000 Rose Lemonade", cat: "Lost Mary 1000" },
    { id: 1531, prov: 12, nombre: "Lost Mary 1000 Pineapple Ice", cat: "Lost Mary 1000" },
    { id: 1532, prov: 12, nombre: "Lost Mary 1000 Pineapple Coconut", cat: "Lost Mary 1000" },
    { id: 1533, prov: 12, nombre: "Lost Mary 1000 Pineapple Mango", cat: "Lost Mary 1000" },
    { id: 1534, prov: 12, nombre: "Lost Mary 1000 Apple Cider", cat: "Lost Mary 1000" },
    { id: 1535, prov: 12, nombre: "Lost Mary 1000 Triple Mango", cat: "Lost Mary 1000" },
    { id: 1536, prov: 12, nombre: "Lost Mary 1000 Triple Melon", cat: "Lost Mary 1000" },
    { id: 1537, prov: 12, nombre: "Lost Mary 1000 Strawberry Guava", cat: "Lost Mary 1000" },
    { id: 1538, prov: 12, nombre: "Lost Mary 1000 Peach Ice", cat: "Lost Mary 1000" },
    { id: 1539, prov: 12, nombre: "Lost Mary 1000 Lemon Lime", cat: "Lost Mary 1000" },
    { id: 1540, prov: 12, nombre: "SKE Crystal 600 Apple Peach", cat: "SKE Crystal 600" },
    { id: 1541, prov: 12, nombre: "SKE Crystal 600 Banana Ice", cat: "SKE Crystal 600" },
    { id: 1542, prov: 12, nombre: "SKE Crystal 600 Blueberry Bubblegum", cat: "SKE Crystal 600" },
    { id: 1543, prov: 12, nombre: "SKE Crystal 600 Blueberry Raspberry", cat: "SKE Crystal 600" },
    { id: 1544, prov: 12, nombre: "SKE Crystal 600 Blueberry Cherry Cranberry", cat: "SKE Crystal 600" },
    { id: 1545, prov: 12, nombre: "SKE Crystal 600 Blueberry Peach Ice", cat: "SKE Crystal 600" },
    { id: 1546, prov: 12, nombre: "SKE Crystal 600 Blue Razz Lemonade", cat: "SKE Crystal 600" },
    { id: 1547, prov: 12, nombre: "SKE Crystal 600 Bull Ice", cat: "SKE Crystal 600" },
    { id: 1548, prov: 12, nombre: "SKE Crystal 600 Cherry Ice", cat: "SKE Crystal 600" },
    { id: 1549, prov: 12, nombre: "SKE Crystal 600 Cotton Candy Ice", cat: "SKE Crystal 600" },
    { id: 1550, prov: 12, nombre: "SKE Crystal 600 Cola Ice", cat: "SKE Crystal 600" },
    { id: 1551, prov: 12, nombre: "SKE Crystal 600 Fizzy Cherry", cat: "SKE Crystal 600" },
    { id: 1552, prov: 12, nombre: "SKE Crystal 600 Fresh Menthol Mojito", cat: "SKE Crystal 600" },
    { id: 1553, prov: 12, nombre: "SKE Crystal 600 Honey Melon", cat: "SKE Crystal 600" },
    { id: 1554, prov: 12, nombre: "SKE Crystal 600 Kiwi Passion Fruit Guava", cat: "SKE Crystal 600" },
    { id: 1555, prov: 12, nombre: "SKE Crystal 600 Lemon & Lime", cat: "SKE Crystal 600" },
    { id: 1556, prov: 12, nombre: "SKE Crystal 600 Lemon Peach Passion Fruit", cat: "SKE Crystal 600" },
    { id: 1557, prov: 12, nombre: "SKE Crystal 600 Mango Ice", cat: "SKE Crystal 600" },
    { id: 1558, prov: 12, nombre: "SKE Crystal 600 Pineapple Peach Mango", cat: "SKE Crystal 600" },
    { id: 1559, prov: 12, nombre: "SKE Crystal 600 Pineapple Lemon & Lime", cat: "SKE Crystal 600" },
    { id: 1560, prov: 12, nombre: "SKE Crystal 600 Pink Lemonade", cat: "SKE Crystal 600" },
    { id: 1561, prov: 12, nombre: "SKE Crystal 600 Peach Ice", cat: "SKE Crystal 600" },
    { id: 1562, prov: 12, nombre: "SKE Crystal 600 Rainbow", cat: "SKE Crystal 600" },
    { id: 1563, prov: 12, nombre: "SKE Crystal 600 Strawberry Blast", cat: "SKE Crystal 600" },
    { id: 1564, prov: 12, nombre: "SKE Crystal 600 Strawberry Banana", cat: "SKE Crystal 600" },
    { id: 1565, prov: 12, nombre: "SKE Crystal 600 Strawberry Kiwi", cat: "SKE Crystal 600" },
    { id: 1566, prov: 12, nombre: "SKE Crystal 600 Strawberry Ice Cream", cat: "SKE Crystal 600" },
    { id: 1567, prov: 12, nombre: "SKE Crystal 600 Strawberry Raspberry", cat: "SKE Crystal 600" },
    { id: 1568, prov: 12, nombre: "SKE Crystal 600 Sour Blueberries", cat: "SKE Crystal 600" },
    { id: 1569, prov: 12, nombre: "SKE Crystal 600 Sour Apple Blueberry", cat: "SKE Crystal 600" },
    { id: 1570, prov: 12, nombre: "SKE Crystal 600 Watermelon Ice", cat: "SKE Crystal 600" },
    { id: 1571, prov: 12, nombre: "SKE Crystal 600 Watermelon Strawberry Bubblegum", cat: "SKE Crystal 600" },
    { id: 1572, prov: 12, nombre: "SKE Crystal 600 Watermelon Cherry", cat: "SKE Crystal 600" },
    // SALADUL
    { id: 1600, prov: 13, nombre: "Kit Kat Normal", cat: "Kit Kat" },
    { id: 1601, prov: 13, nombre: "Kit Kat Dark", cat: "Kit Kat" },
    { id: 1602, prov: 13, nombre: "Kit Kat Blanco", cat: "Kit Kat" },
    { id: 1603, prov: 13, nombre: "Kit Kat Negro", cat: "Kit Kat" },
    { id: 1604, prov: 13, nombre: "Kit Kat Chunky Normal", cat: "Kit Kat" },
    { id: 1605, prov: 13, nombre: "Kit Kat Chunky Blanco", cat: "Kit Kat" },
    { id: 1606, prov: 13, nombre: "Kit Kat Chunky Peanut", cat: "Kit Kat" },
    { id: 1607, prov: 13, nombre: "Kit Kat Chunky", cat: "Kit Kat" },
    { id: 1608, prov: 13, nombre: "Mars Pequeño", cat: "Mars / Snickers" },
    { id: 1609, prov: 13, nombre: "Mars Grande", cat: "Mars / Snickers" },
    { id: 1610, prov: 13, nombre: "Snickers Pequeño", cat: "Mars / Snickers" },
    { id: 1611, prov: 13, nombre: "Snickers Grande", cat: "Mars / Snickers" },
    { id: 1612, prov: 13, nombre: "Bounty Pequeño", cat: "Mars / Snickers" },
    { id: 1613, prov: 13, nombre: "Bounty Trio", cat: "Mars / Snickers" },
    { id: 1614, prov: 13, nombre: "Bounty", cat: "Mars / Snickers" },
    { id: 1615, prov: 13, nombre: "Milkyway Doble", cat: "Mars / Snickers" },
    { id: 1616, prov: 13, nombre: "Twix Grande", cat: "Mars / Snickers" },
    { id: 1617, prov: 13, nombre: "Twix Xtra", cat: "Mars / Snickers" },
    { id: 1618, prov: 13, nombre: "Twix Pequeño", cat: "Mars / Snickers" },
    { id: 1619, prov: 13, nombre: "Lion Pequeño", cat: "Mars / Snickers" },
    { id: 1620, prov: 13, nombre: "Teasers", cat: "Mars / Snickers" },
    { id: 1621, prov: 13, nombre: "Smarties", cat: "Mars / Snickers" },
    { id: 1622, prov: 13, nombre: "MMs Amarillo Bolsa 45g", cat: "MMs / Skittles" },
    { id: 1623, prov: 13, nombre: "MMs Amarillo Bolsa 90g", cat: "MMs / Skittles" },
    { id: 1624, prov: 13, nombre: "Skittles Rojo", cat: "MMs / Skittles" },
    { id: 1625, prov: 13, nombre: "Skittles Verde", cat: "MMs / Skittles" },
    { id: 1626, prov: 13, nombre: "Protein Bar Azul", cat: "Protein Bar" },
    { id: 1627, prov: 13, nombre: "Protein Bar Double Choc", cat: "Protein Bar" },
    { id: 1628, prov: 13, nombre: "Protein Bar Peanut", cat: "Protein Bar" },
    { id: 1629, prov: 13, nombre: "Protein Bar Peanut Butter", cat: "Protein Bar" },
    { id: 1630, prov: 13, nombre: "Orbit Menta Azul", cat: "Orbit" },
    { id: 1631, prov: 13, nombre: "Orbit Bote Menta Azul", cat: "Orbit" },
    { id: 1632, prov: 13, nombre: "Orbit White Menta", cat: "Orbit" },
    { id: 1633, prov: 13, nombre: "Orbit Hierbabuena", cat: "Orbit" },
    { id: 1634, prov: 13, nombre: "Orbit White Hierbabuena", cat: "Orbit" },
    { id: 1635, prov: 13, nombre: "Orbit Bote Hierbabuena", cat: "Orbit" },
    { id: 1636, prov: 13, nombre: "Orbit Arándanos", cat: "Orbit" },
    { id: 1637, prov: 13, nombre: "Orbit Bubble Mint", cat: "Orbit" },
    { id: 1638, prov: 13, nombre: "Orbit Sandía", cat: "Orbit" },
    { id: 1639, prov: 13, nombre: "Orbit Eucalipto", cat: "Orbit" },
    { id: 1640, prov: 13, nombre: "Orbit Mentol Fuerte", cat: "Orbit" },
    { id: 1641, prov: 13, nombre: "Orbit Fresa", cat: "Orbit" },
    { id: 1642, prov: 13, nombre: "Orbit Bote Fresa", cat: "Orbit" },
    { id: 1643, prov: 13, nombre: "Smint Fresa Lata", cat: "Smint" },
    { id: 1644, prov: 13, nombre: "Smint Lata Limón", cat: "Smint" },
    { id: 1645, prov: 13, nombre: "Boom Spray Liquid Candy", cat: "Johny Bee" },
    { id: 1646, prov: 13, nombre: "Sweet Shooter Jelly Bean", cat: "Johny Bee" },
    { id: 1647, prov: 13, nombre: "Pop It Spinner", cat: "Johny Bee" },
    { id: 1648, prov: 13, nombre: "Whistle Car Pop Lollipop", cat: "Johny Bee" },
    { id: 1649, prov: 13, nombre: "Chameleon Gun Pop Lollipop Tongue", cat: "Johny Bee" },
    { id: 1650, prov: 13, nombre: "Sour Potty Lollipop Candy Powder", cat: "Johny Bee" },
    { id: 1651, prov: 13, nombre: "Gum Ball Machine Bubble Gum", cat: "Johny Bee" },
    { id: 1652, prov: 13, nombre: "Kinder Bueno 10x2", cat: "Johny Bee" },
    { id: 1653, prov: 13, nombre: "Dino Gun Pop Lollipop", cat: "Johny Bee" },
    // WESTFALIA
    { id: 1700, prov: 14, nombre: "Back Bacon", cat: "Cárnico" },
    { id: 1701, prov: 14, nombre: "Jamón Cocido Lonchas", cat: "Cárnico" },
    { id: 1702, prov: 14, nombre: "Jamón Cocido Duroc", cat: "Cárnico" },
    { id: 1703, prov: 14, nombre: "Jamón Serrano Lonchas", cat: "Cárnico" },
    { id: 1704, prov: 14, nombre: "Salami Pimienta", cat: "Cárnico" },
    { id: 1705, prov: 14, nombre: "Salami Lonchas", cat: "Cárnico" },
    { id: 1706, prov: 14, nombre: "Surtido Tapas", cat: "Cárnico" },
    { id: 1707, prov: 14, nombre: "Tortilla Cebolla", cat: "Varios" },
    { id: 1708, prov: 14, nombre: "Mantequilla Just Like Butter", cat: "Lácteos" },
    { id: 1709, prov: 14, nombre: "Mantequilla Willow", cat: "Lácteos" },
    { id: 1710, prov: 14, nombre: "Mantequilla Utterly Butterly", cat: "Lácteos" },
    { id: 1711, prov: 14, nombre: "Mantequilla Meggle 125g", cat: "Lácteos" },
    { id: 1712, prov: 14, nombre: "Meggle Panna per Caffè", cat: "Lácteos" },
    { id: 1713, prov: 14, nombre: "Quark Chocolate", cat: "Lácteos" },
    { id: 1714, prov: 14, nombre: "Quark Vainilla", cat: "Lácteos" },
    { id: 1715, prov: 14, nombre: "Profeel Batido Proteína Fresa", cat: "Bebidas" },
    { id: 1716, prov: 14, nombre: "Profeel Batido Proteína Chocolate", cat: "Bebidas" },
    { id: 1717, prov: 14, nombre: "Galletas Bounty", cat: "Galletas" },
    { id: 1718, prov: 14, nombre: "Galletas Mars", cat: "Galletas" },
    { id: 1719, prov: 14, nombre: "Galletas Twix", cat: "Galletas" },
    { id: 1720, prov: 14, nombre: "Galletas Twix Soft", cat: "Galletas" },
    { id: 1721, prov: 14, nombre: "Longaniza de Payés", cat: "Cárnico" },
    { id: 1722, prov: 14, nombre: "Bacon Ahumado en Lonchas", cat: "Cárnico" },
    { id: 1723, prov: 14, nombre: "Salami Pimienta en Lonchas", cat: "Cárnico" },
    { id: 1724, prov: 14, nombre: "Salami Normal Lonchas", cat: "Cárnico" },
    // ROPER
    { id: 1800, prov: 15, nombre: "Elephant Pretzels Tomato & Herbs 70g", cat: "Elephant" },
    { id: 1801, prov: 15, nombre: "Elephant Pretzels Sea Salt 70g", cat: "Elephant" },
    { id: 1802, prov: 15, nombre: "Elephant Pretzels Honey Mustard & Onion 70g", cat: "Elephant" },
    { id: 1803, prov: 15, nombre: "Krambals Bruschetta Creamy Cheese", cat: "Krambals" },
    { id: 1804, prov: 15, nombre: "Krambals Bruschetta Tomato & Mozzarella", cat: "Krambals" },
    { id: 1805, prov: 15, nombre: "Krambals Bruschetta Green Olives & Sea Salt", cat: "Krambals" },
    { id: 1806, prov: 15, nombre: "Saltletts Cocktail Mix 180g", cat: "Lorenz" },
    { id: 1807, prov: 15, nombre: "Saltletts Brezel", cat: "Lorenz" },
    { id: 1808, prov: 15, nombre: "Saltletts Sticks", cat: "Lorenz" },
    { id: 1809, prov: 15, nombre: "Chio Brezli Original", cat: "Chio" },
    { id: 1810, prov: 15, nombre: "Chio Stickletti Original", cat: "Chio" },
    { id: 1811, prov: 15, nombre: "Chio Maxi Mix", cat: "Chio" },
    { id: 1812, prov: 15, nombre: "Radnor Fresa", cat: "Agua Sabores" },
    { id: 1813, prov: 15, nombre: "Radnor Frutas del Bosque", cat: "Agua Sabores" },
    { id: 1814, prov: 15, nombre: "Radnor Naranja", cat: "Agua Sabores" },
    { id: 1815, prov: 15, nombre: "Radnor Manzana", cat: "Agua Sabores" },
    { id: 1816, prov: 15, nombre: "Radnor Sandía", cat: "Agua Sabores" },
    { id: 1817, prov: 15, nombre: "Radnor Lima Limón", cat: "Agua Sabores" },
    { id: 1818, prov: 15, nombre: "Leche Pequeña Azul", cat: "Lácteos" },
    { id: 1819, prov: 15, nombre: "Leche Pequeña Verde", cat: "Lácteos" },
    // ITALIANO
    { id: 1900, prov: 16, nombre: "Pan di Stelle", cat: "Pavesi" },
    { id: 1901, prov: 16, nombre: "Gocciole Chocolate", cat: "Pavesi" },
    { id: 1902, prov: 16, nombre: "Mulino Bianco Baiocchi Classici", cat: "Mulino Bianco" },
    { id: 1903, prov: 16, nombre: "Mulino Bianco Baiocchi Pistacchio", cat: "Mulino Bianco" },
    { id: 1904, prov: 16, nombre: "Mulino Bianco Cuor di Mela", cat: "Mulino Bianco" },
    { id: 1905, prov: 16, nombre: "Mulino Bianco Settembrini", cat: "Mulino Bianco" },
    { id: 1906, prov: 16, nombre: "Mulino Bianco Galletti", cat: "Mulino Bianco" },
    { id: 1907, prov: 16, nombre: "Mulino Bianco Tarallucci", cat: "Mulino Bianco" },
    { id: 1908, prov: 16, nombre: "Mulino Bianco Abbracci", cat: "Mulino Bianco" },
    { id: 1909, prov: 16, nombre: "Kinder Colazione Più", cat: "Kinder" },
    { id: 1910, prov: 16, nombre: "Kinder Pan e Cioc", cat: "Kinder" },
    { id: 1911, prov: 16, nombre: "Kinder Brioss", cat: "Kinder" },
    { id: 1912, prov: 16, nombre: "Kinder Brioss Latte e Cacao", cat: "Kinder" },
    { id: 1913, prov: 16, nombre: "Kinder Délice", cat: "Kinder" },
    { id: 1914, prov: 16, nombre: "Kinder Kornetti Cioccolato", cat: "Kinder" },
    { id: 1915, prov: 16, nombre: "Kinder Kornetti Crema", cat: "Kinder" },
    { id: 1916, prov: 16, nombre: "Kinder Plumcake", cat: "Kinder" },
    { id: 1917, prov: 16, nombre: "Bauli Croissant Pistacchio", cat: "Bauli" },
    { id: 1918, prov: 16, nombre: "Bauli Croissant Cioccolato", cat: "Bauli" },
    { id: 1919, prov: 16, nombre: "Ferrero Fiesta l'Originale", cat: "Ferrero" },
    { id: 1920, prov: 16, nombre: "Cameo Snack Friends Sticks 100g", cat: "Cameo" },
    { id: 1921, prov: 16, nombre: "Cameo Snack Friends Cocktail 150g", cat: "Cameo" },
    { id: 1922, prov: 16, nombre: "Gran Biraghi Grattugiato Fresco 100g", cat: "Queso" },
    { id: 1923, prov: 16, nombre: "Pecorino Grattugiato Fresco 100g", cat: "Queso" },
    { id: 1924, prov: 16, nombre: "Barilla Pomodoro e Datterini", cat: "Barilla Salsas" },
    { id: 1925, prov: 16, nombre: "Barilla Arrabbiata", cat: "Barilla Salsas" },
    { id: 1926, prov: 16, nombre: "Barilla Ragù Contadino", cat: "Barilla Salsas" },
    { id: 1927, prov: 16, nombre: "Barilla Ragù Montanaro", cat: "Barilla Salsas" },
    { id: 1928, prov: 16, nombre: "Barilla Ragù alla Bolognese", cat: "Barilla Salsas" },
    { id: 1929, prov: 16, nombre: "Barilla Tonno", cat: "Barilla Salsas" },
    { id: 1930, prov: 16, nombre: "Barilla Pesto Genovese", cat: "Barilla Pesto" },
    { id: 1931, prov: 16, nombre: "Barilla Pesto Genovese Senza Aglio", cat: "Barilla Pesto" },
    { id: 1932, prov: 16, nombre: "Barilla Pesto con Rucola", cat: "Barilla Pesto" },
    { id: 1933, prov: 16, nombre: "Barilla Pesto Basilico e Pistacchio", cat: "Barilla Pesto" },
    { id: 1934, prov: 16, nombre: "Barilla Pesto Ricotta e Noci", cat: "Barilla Pesto" },
    { id: 1935, prov: 16, nombre: "Tigullio Arciofi e Noci", cat: "Tigullio" },
    { id: 1936, prov: 16, nombre: "Tigullio Olive e Capperi", cat: "Tigullio" },
    { id: 1937, prov: 16, nombre: "Tigullio Pomodori Secchi e Pistacchi", cat: "Tigullio" },
    { id: 1938, prov: 16, nombre: "Tigullio Peperoni e Noci", cat: "Tigullio" },
    { id: 1939, prov: 16, nombre: "Tigullio Ricotta e Pistacchi", cat: "Tigullio" },
    { id: 1940, prov: 16, nombre: "Tigullio Gran Pesto alla Genovese", cat: "Tigullio" },
    { id: 1941, prov: 16, nombre: "Tigullio Gran Pesto Senz'Aglio", cat: "Tigullio" },
    { id: 1942, prov: 16, nombre: "Tigullio Cacio e Pepe", cat: "Tigullio" },
    { id: 1943, prov: 16, nombre: "Tigullio Ricotta Tartufo e Pepe Nero", cat: "Tigullio" },
    { id: 1944, prov: 16, nombre: "Tigullio Salsa di Noci", cat: "Tigullio" },
    { id: 1945, prov: 16, nombre: "Tigullio Radicchio e Speck", cat: "Tigullio" },
    { id: 1946, prov: 16, nombre: "Tigullio Carciofi e Noci", cat: "Tigullio" },
    { id: 1947, prov: 16, nombre: "Mutti Passata al Basilico", cat: "Tomate" },
    { id: 1948, prov: 16, nombre: "Mutti Passata di Pomodoro", cat: "Tomate" },
    { id: 1949, prov: 16, nombre: "La Fiammante La Passata", cat: "Tomate" },
    { id: 1950, prov: 16, nombre: "Tennents Botellas", cat: "Cerveza" },
    { id: 1951, prov: 16, nombre: "Ichnusa Normal", cat: "Cerveza" },
    { id: 1952, prov: 16, nombre: "Ichnusa Non Filtrada", cat: "Cerveza" },
    { id: 1953, prov: 16, nombre: "Estathe Limón Lata", cat: "Estathe" },
    { id: 1954, prov: 16, nombre: "Estathe Pesca Lata", cat: "Estathe" },
    { id: 1955, prov: 16, nombre: "Estathe Limón 1.5L", cat: "Estathe" },
    { id: 1956, prov: 16, nombre: "Estathe Pesca 1.5L", cat: "Estathe" },
    { id: 1957, prov: 16, nombre: "San Pellegrino 1L", cat: "Agua" },
    { id: 1958, prov: 16, nombre: "San Pellegrino Lata", cat: "Agua" },
    // FONTEIDE
    { id: 2000, prov: 17, nombre: "Fonteide 1.5L", cat: "Agua" },
    { id: 2001, prov: 17, nombre: "Fonteide 50cl", cat: "Agua" },
    { id: 2002, prov: 17, nombre: "Fonteide 5L", cat: "Agua" },
    { id: 2003, prov: 17, nombre: "Fonteide Sport 75cl", cat: "Agua" },
    // OMBU
    { id: 2100, prov: 18, nombre: "Ombu Salami + Gouda", cat: "Surtidos + Gouda" },
    { id: 2101, prov: 18, nombre: "Ombu York + Gouda", cat: "Surtidos + Gouda" },
    { id: 2102, prov: 18, nombre: "Ombu Salchichón + Gouda", cat: "Surtidos + Gouda" },
    { id: 2103, prov: 18, nombre: "Ombu Chorizo + Gouda", cat: "Surtidos + Gouda" },
    { id: 2104, prov: 18, nombre: "Ombu Croissants", cat: "Bollería" },
    { id: 2105, prov: 18, nombre: "Ombu Sandwiches", cat: "Bollería" },
    // ITALIANO - nuevos
    { id: 2200, prov: 16, nombre: "Barilla Spaghetti", cat: "Barilla Pasta" },
    { id: 2201, prov: 16, nombre: "Barilla Linguine", cat: "Barilla Pasta" },
    { id: 2202, prov: 16, nombre: "Barilla Farfalle", cat: "Barilla Pasta" },
    { id: 2203, prov: 16, nombre: "Barilla Penne Rigate", cat: "Barilla Pasta" },
    { id: 2204, prov: 16, nombre: "Barilla Rigatoni", cat: "Barilla Pasta" },
    { id: 2205, prov: 16, nombre: "Barilla Fusilli", cat: "Barilla Pasta" },
    { id: 2206, prov: 16, nombre: "Rummo Spaghetti", cat: "Rummo Pasta" },
    { id: 2207, prov: 16, nombre: "Rummo Linguine", cat: "Rummo Pasta" },
    { id: 2208, prov: 16, nombre: "Rummo Elicoidali", cat: "Rummo Pasta" },
    { id: 2209, prov: 16, nombre: "Rummo Penne Rigate", cat: "Rummo Pasta" },
    { id: 2210, prov: 16, nombre: "Rummo Rigatoni", cat: "Rummo Pasta" },
    { id: 2211, prov: 16, nombre: "Rummo Fusilli", cat: "Rummo Pasta" },
    { id: 2212, prov: 16, nombre: "Rummo Casarecce", cat: "Rummo Pasta" },
    { id: 2213, prov: 16, nombre: "Parmigiano Reggiano Ferrarini", cat: "Queso" },
    { id: 2214, prov: 16, nombre: "Guanciale Ferrarini", cat: "Cárnico" },
    { id: 2215, prov: 16, nombre: "De Cecco Sugo al Pomodoro", cat: "De Cecco Salsas" },
    { id: 2216, prov: 16, nombre: "De Cecco Sugo al Basilico", cat: "De Cecco Salsas" },
    { id: 2217, prov: 16, nombre: "De Cecco Sugo alla Arrabbiata", cat: "De Cecco Salsas" },
    { id: 2218, prov: 16, nombre: "De Cecco Sugo alle Olive", cat: "De Cecco Salsas" },
    { id: 2219, prov: 16, nombre: "De Cecco Sugo alla Bolognese", cat: "De Cecco Salsas" },
    { id: 2220, prov: 16, nombre: "Mutti Salsa Pronta Ciliegini", cat: "Tomate" },
    { id: 2221, prov: 16, nombre: "Mutti Salsa Pronta Datterini", cat: "Tomate" },
    { id: 2222, prov: 16, nombre: "Mutti Salsa Pronta Classica", cat: "Tomate" },
    // TABACO BOCA PABLO
    { id: 2300, prov: 19, nombre: "Pablo Grape Ice", cat: "Pablo Exclusive" },
    { id: 2301, prov: 19, nombre: "Pablo Strawberry Lychee", cat: "Pablo Exclusive" },
    { id: 2302, prov: 19, nombre: "Pablo Mango Ice", cat: "Pablo Exclusive" },
    { id: 2303, prov: 19, nombre: "Pablo Banana Ice", cat: "Pablo Exclusive" },
    { id: 2304, prov: 19, nombre: "Pablo Frosted Mint", cat: "Pablo Exclusive" },
    { id: 2305, prov: 19, nombre: "Pablo Frosted Ice", cat: "Pablo Exclusive" },
    { id: 2306, prov: 19, nombre: "Pablo Cappuccino", cat: "Pablo Exclusive" },
    { id: 2307, prov: 19, nombre: "Pablo Strawberry Cheesecake", cat: "Pablo Exclusive" },
    { id: 2308, prov: 19, nombre: "Pablo Bubblegum", cat: "Pablo Exclusive" },
    { id: 2309, prov: 19, nombre: "Pablo Strawberry Watermelon", cat: "Pablo Exclusive" },
    { id: 2310, prov: 19, nombre: "Pablo Kiwi", cat: "Pablo Exclusive" },
    { id: 2311, prov: 19, nombre: "Pablo Red", cat: "Pablo Danger Strong" },
    { id: 2312, prov: 19, nombre: "Pablo Ice Cold", cat: "Pablo Danger Strong" },
    { id: 2313, prov: 19, nombre: "Pablo X-Ice Cold", cat: "Pablo Danger Strong" },
    { id: 2314, prov: 19, nombre: "Pablo Lemonade", cat: "Pablo Danger Strong" },
    { id: 2315, prov: 19, nombre: "Pablo Passion Fruit", cat: "Pablo Danger Strong" },
    // PRODUCTOS SIN GLUTEN
    { id: 2400, prov: 20, nombre: "Choco Chips Cookies Schar 200g", cat: "Schar Galletas" },
    { id: 2401, prov: 20, nombre: "Petit al Cioccolato Schar 130g", cat: "Schar Galletas" },
    { id: 2402, prov: 20, nombre: "Galletas Maxi Choco Schar 250g", cat: "Schar Galletas" },
    { id: 2403, prov: 20, nombre: "Sable Choc Schar 150g", cat: "Schar Galletas" },
    { id: 2404, prov: 20, nombre: "Petit Biscotto Classico Schar 165g", cat: "Schar Galletas" },
    { id: 2405, prov: 20, nombre: "Choco Galleta Schar 150g", cat: "Schar Galletas" },
    { id: 2406, prov: 20, nombre: "Galletas María Schar 200g", cat: "Schar Galletas" },
    { id: 2407, prov: 20, nombre: "Wafers al Cacao Schar 125g", cat: "Schar Wafers" },
    { id: 2408, prov: 20, nombre: "Grissini Schar", cat: "Schar Snacks" },
    { id: 2409, prov: 20, nombre: "Ciocko Sticks Schar 130g", cat: "Schar Snacks" },
    { id: 2410, prov: 20, nombre: "Crackers Schar", cat: "Schar Snacks" },
    { id: 2411, prov: 20, nombre: "Salinis Schar 60g", cat: "Schar Snacks" },
    { id: 2412, prov: 20, nombre: "Chocolate Os Schar", cat: "Schar Snacks" },
    { id: 2413, prov: 20, nombre: "Ecocesta Tortas de Arroz", cat: "Ecocesta" },
    { id: 2414, prov: 20, nombre: "Ecocesta Tortas de Arroz Avena", cat: "Ecocesta" },
    { id: 2415, prov: 20, nombre: "Ecocesta Tortas de Maíz", cat: "Ecocesta" },
    { id: 2416, prov: 20, nombre: "Ecocesta Tortas de Arroz Lenteja", cat: "Ecocesta" },
    // LECHE FRESCO
    { id: 2500, prov: 21, nombre: "Leche Entera 1L", cat: "Leche" },
    { id: 2501, prov: 21, nombre: "Leche Semidesnatada 1L", cat: "Leche" },
    // ALFRAN TABACO - Nuevos
    { id: 401, prov: 1, nombre: "American Spirit", cat: "Otros" },
    { id: 402, prov: 1, nombre: "American Spirit Liar", cat: "Tabaco Liar" },
    { id: 403, prov: 1, nombre: "Terea Teak", cat: "Terea / IQOS" },
    { id: 404, prov: 1, nombre: "Terea Sienna", cat: "Terea / IQOS" },
    { id: 405, prov: 1, nombre: "Terea Amber", cat: "Terea / IQOS" },
    { id: 406, prov: 1, nombre: "Terea Amarillo", cat: "Terea / IQOS" },
    { id: 407, prov: 1, nombre: "Camel Doble Finos", cat: "Camel" },
    { id: 408, prov: 1, nombre: "Camel Activa", cat: "Camel" },
    { id: 409, prov: 1, nombre: "Manitou Verde", cat: "Tabaco Liar" },
    { id: 410, prov: 1, nombre: "Manitou Verde Liar", cat: "Tabaco Liar" },
    { id: 411, prov: 1, nombre: "Manitou Amarillo", cat: "Tabaco Liar" },
    { id: 412, prov: 1, nombre: "Superking Azul", cat: "Otros" },
    { id: 413, prov: 1, nombre: "Benson Gold", cat: "Benson" },
    { id: 414, prov: 1, nombre: "Benson Option", cat: "Benson" },
    { id: 415, prov: 1, nombre: "JPS Azul", cat: "Otros" },
    { id: 416, prov: 1, nombre: "Amberleaf de 5", cat: "Tabaco Liar" },
    { id: 417, prov: 1, nombre: "Philip Morris Rojo", cat: "Otros" },
    { id: 418, prov: 1, nombre: "Ome Rosa", cat: "Otros" },
    { id: 419, prov: 1, nombre: "Ome Amarillo", cat: "Otros" },
    { id: 420, prov: 1, nombre: "Corset Marine", cat: "Corset" },
    { id: 421, prov: 1, nombre: "Corset Pink", cat: "Corset" },
    { id: 422, prov: 1, nombre: "Corset Lila", cat: "Corset" },
    { id: 423, prov: 1, nombre: "Signature Azul", cat: "Otros" },
    { id: 424, prov: 1, nombre: "Signature Amarillo", cat: "Otros" },
    { id: 425, prov: 1, nombre: "Winston Rojo Largo", cat: "Winston" },
    { id: 426, prov: 1, nombre: "Lucky Strike Verde", cat: "Lucky Strike" },
    { id: 427, prov: 1, nombre: "Lucky Strike Azul", cat: "Lucky Strike" },
    { id: 428, prov: 1, nombre: "Lucky Strike Marrón", cat: "Lucky Strike" },
    { id: 429, prov: 1, nombre: "Lucky Strike Silver", cat: "Lucky Strike" },
    { id: 430, prov: 1, nombre: "Lucky Strike Twist", cat: "Lucky Strike" },
    { id: 431, prov: 1, nombre: "Lucky Strike Natural Marrón", cat: "Lucky Strike" },
    { id: 432, prov: 1, nombre: "Karelia Verde", cat: "Otros" },
    { id: 433, prov: 1, nombre: "Karelia Normal", cat: "Otros" },
    { id: 434, prov: 1, nombre: "Fortuna Red Line", cat: "Otros" },
    { id: 435, prov: 1, nombre: "Golden Virginia 30g", cat: "Tabaco Liar" },
    { id: 436, prov: 1, nombre: "Mayfair Sky Blue", cat: "Otros" },
    { id: 437, prov: 1, nombre: "Marlboro Pocket", cat: "Marlboro" },
    { id: 438, prov: 1, nombre: "Pall Mall Rojo", cat: "Otros" },
    { id: 439, prov: 1, nombre: "West Silver", cat: "Otros" },
    { id: 440, prov: 1, nombre: "Davidoff Gold", cat: "Otros" },
    { id: 441, prov: 1, nombre: "Davidoff Rojo", cat: "Otros" },
    { id: 442, prov: 1, nombre: "Regal", cat: "Otros" },
    { id: 443, prov: 1, nombre: "Sterling Rojo", cat: "Otros" },
    { id: 444, prov: 1, nombre: "Rothmans Azul", cat: "Otros" },
    { id: 445, prov: 1, nombre: "Chester Rojo", cat: "Chester" },
    { id: 446, prov: 1, nombre: "Velo Tropical", cat: "Nicotina" },
    { id: 447, prov: 1, nombre: "Velo Fresa", cat: "Nicotina" },
    { id: 448, prov: 1, nombre: "Velo Lima", cat: "Nicotina" },
    { id: 449, prov: 1, nombre: "Richmond Azul Superking", cat: "Otros" },
    { id: 450, prov: 1, nombre: "Windsor Azul Superking", cat: "Otros" },
    { id: 451, prov: 1, nombre: "Puros Hamlet", cat: "Puros" },
    // ALFRAN GALLETAS
    { id: 500, prov: 5, nombre: "Milka Mini Cookies", cat: "Milka Galletas" },
    { id: 501, prov: 5, nombre: "Milka Mini Wafers", cat: "Milka Galletas" },
    { id: 502, prov: 5, nombre: "Milka Choco Cookies", cat: "Milka Galletas" },
    { id: 503, prov: 5, nombre: "Milka Choco Sticks", cat: "Milka Galletas" },
    { id: 504, prov: 5, nombre: "Milka Choco Biscuits", cat: "Milka Galletas" },
    { id: 505, prov: 5, nombre: "Milka Choco Cake", cat: "Milka Galletas" },
    { id: 506, prov: 5, nombre: "Milka Choco Brookie", cat: "Milka Galletas" },
    { id: 507, prov: 5, nombre: "Milka Choco Trio", cat: "Milka Galletas" },
    { id: 508, prov: 5, nombre: "Milka Choco Wafers", cat: "Milka Galletas" },
    { id: 509, prov: 5, nombre: "Milka Sensation", cat: "Milka Galletas" },
    { id: 510, prov: 5, nombre: "Milka Tender Moo", cat: "Milka Galletas" },
    { id: 511, prov: 5, nombre: "Milka Croissants Cacao", cat: "Milka Galletas" },
    { id: 512, prov: 5, nombre: "Milka Croissants Vainilla", cat: "Milka Galletas" },
    { id: 513, prov: 5, nombre: "Milka Choco Pausé", cat: "Milka Galletas" },
    { id: 514, prov: 5, nombre: "Milka Choco Moo", cat: "Milka Galletas" },
    { id: 515, prov: 5, nombre: "Milka Choco Finas", cat: "Milka Galletas" },
    { id: 516, prov: 5, nombre: "Milka Choco Brownie", cat: "Milka Galletas" },
    { id: 517, prov: 5, nombre: "Milka Tableta Tuc", cat: "Milka Tabletas" },
    { id: 518, prov: 5, nombre: "Milka Tableta Lotus", cat: "Milka Tabletas" },
    { id: 519, prov: 5, nombre: "Milka Tableta Sandwich Oreo", cat: "Milka Tabletas" },
    { id: 520, prov: 5, nombre: "Milka Tableta Cacahuete Caramelo Crujiente", cat: "Milka Tabletas" },
    { id: 521, prov: 5, nombre: "Milka Tableta Bubbly", cat: "Milka Tabletas" },
    { id: 522, prov: 5, nombre: "Milka Tableta Daim", cat: "Milka Tabletas" },
    { id: 523, prov: 5, nombre: "Milka Tableta Leche", cat: "Milka Tabletas" },
    { id: 524, prov: 5, nombre: "Milka Tableta Oreo White", cat: "Milka Tabletas" },
    { id: 525, prov: 5, nombre: "Milka Tableta LU", cat: "Milka Tabletas" },
    { id: 526, prov: 5, nombre: "Milka Tableta Confetti", cat: "Milka Tabletas" },
    { id: 527, prov: 5, nombre: "Milka Tableta Chips Ahoy", cat: "Milka Tabletas" },
    { id: 528, prov: 5, nombre: "Milka Tableta Avellanas Enteras", cat: "Milka Tabletas" },
    { id: 529, prov: 5, nombre: "Milka Tableta Oreo", cat: "Milka Tabletas" },
    { id: 530, prov: 5, nombre: "Milka Tableta Chocolate Negro", cat: "Milka Tabletas" },
    { id: 531, prov: 5, nombre: "Milka Tableta Chocolate Blanco", cat: "Milka Tabletas" },
    { id: 532, prov: 5, nombre: "Milka Tableta Biscoff", cat: "Milka Tabletas" },
    { id: 533, prov: 5, nombre: "Milka Tableta Leche 90g", cat: "Milka Tabletas" },
    { id: 534, prov: 5, nombre: "Oreo Bañadas Blanco", cat: "Oreo" },
    { id: 535, prov: 5, nombre: "Oreo Bañadas Chocolate Blanco", cat: "Oreo" },
    { id: 536, prov: 5, nombre: "Oreo Crunchy Bites", cat: "Oreo" },
    { id: 537, prov: 5, nombre: "Oreo Mini en Botes", cat: "Oreo" },
    { id: 538, prov: 5, nombre: "Oreo Remix Rodillo Raspberry", cat: "Oreo" },
    { id: 539, prov: 5, nombre: "Oreo Remix Amarillo", cat: "Oreo" },
    { id: 540, prov: 5, nombre: "Oreo Rodillo Golden", cat: "Oreo" },
    { id: 541, prov: 5, nombre: "Oreo Rodillo Brownie", cat: "Oreo" },
    { id: 542, prov: 5, nombre: "Oreo Rodillo Doble", cat: "Oreo" },
    { id: 543, prov: 5, nombre: "Oreo Rodillo Doble Creme", cat: "Oreo" },
    { id: 544, prov: 5, nombre: "Oreo Rodillo Original", cat: "Oreo" },
    { id: 545, prov: 5, nombre: "Chips Ahoy Mini Cajitas Cartón", cat: "Chips Ahoy" },
    { id: 546, prov: 5, nombre: "Chips Ahoy 128g", cat: "Chips Ahoy" },
    { id: 547, prov: 5, nombre: "Chips Ahoy Sensation Oreo", cat: "Chips Ahoy" },
    { id: 548, prov: 5, nombre: "Chips Ahoy Minis en Bote", cat: "Chips Ahoy" },
    { id: 549, prov: 5, nombre: "Cadbury Barritas Caramel", cat: "Cadbury" },
    { id: 550, prov: 5, nombre: "Cadbury Barritas Leche 110g", cat: "Cadbury" },
    { id: 551, prov: 5, nombre: "Cadbury Barritas Fruit Nut", cat: "Cadbury" },
    { id: 552, prov: 5, nombre: "Cadbury Barritas Whole Nut", cat: "Cadbury" },
    { id: 553, prov: 5, nombre: "Cadbury Tableta Leche 110g", cat: "Cadbury" },
    { id: 554, prov: 5, nombre: "Cadbury Tableta Whole Nut", cat: "Cadbury" },
    { id: 555, prov: 5, nombre: "Cadbury Tableta Fruit Nut", cat: "Cadbury" },
    { id: 556, prov: 5, nombre: "Toblerone Barritas 100g", cat: "Toblerone" },
    { id: 557, prov: 5, nombre: "Toblerone Barrita 50g", cat: "Toblerone" },
    { id: 558, prov: 5, nombre: "Twirl Barritas", cat: "Cadbury" },
    { id: 559, prov: 5, nombre: "Mikado Go Leche", cat: "Mikado" },
    { id: 560, prov: 5, nombre: "Galletas Tuc Original", cat: "Galletas" },
    { id: 561, prov: 5, nombre: "Tuc Queso", cat: "Galletas" },
    { id: 562, prov: 5, nombre: "Tuc Bacon", cat: "Galletas" },
    { id: 563, prov: 5, nombre: "Galletas Príncipe", cat: "Galletas" },
    { id: 564, prov: 5, nombre: "Galletas Ritz Crackers", cat: "Galletas" },
    { id: 565, prov: 5, nombre: "Kellogg's Special K", cat: "Kellogg's" },
    { id: 566, prov: 5, nombre: "Kellogg's Krave", cat: "Kellogg's" },
    { id: 567, prov: 5, nombre: "Kellogg's Crunchy Nuts", cat: "Kellogg's" },
    { id: 568, prov: 5, nombre: "Kellogg's Frosties", cat: "Kellogg's" },
    { id: 569, prov: 5, nombre: "Kellogg's Corn Flakes", cat: "Kellogg's" },
    { id: 570, prov: 5, nombre: "Kellogg's Choco Krispies", cat: "Kellogg's" },
    { id: 571, prov: 5, nombre: "Kellogg's Smacks", cat: "Kellogg's" },
    { id: 572, prov: 5, nombre: "Kellogg's Cereal Miel Pops", cat: "Kellogg's" },
    { id: 573, prov: 5, nombre: "Kellogg's Cereal Froot Loop", cat: "Kellogg's" },
    { id: 574, prov: 5, nombre: "Kellogg's All Bran Flakes Azul", cat: "Kellogg's" },
    { id: 575, prov: 5, nombre: "Coolife Sprao", cat: "Coolife" },
    { id: 576, prov: 5, nombre: "Coolife Caramel", cat: "Coolife" },
    { id: 577, prov: 5, nombre: "Coolife Cappuccino", cat: "Coolife" },
    { id: 578, prov: 5, nombre: "Coolife Cookies", cat: "Coolife" },
    { id: 579, prov: 5, nombre: "Coolife Dubai", cat: "Coolife" },
    { id: 580, prov: 5, nombre: "Coolife Bombón", cat: "Coolife" },
    { id: 581, prov: 5, nombre: "Coolife Espresso", cat: "Coolife" },
    { id: 582, prov: 5, nombre: "Coolife Latte", cat: "Coolife" },
    { id: 583, prov: 5, nombre: "Coolife Macchiato", cat: "Coolife" },
    { id: 584, prov: 5, nombre: "Coolife Bio", cat: "Coolife" },
    { id: 585, prov: 5, nombre: "Coolife Café Cookies", cat: "Coolife" },
    { id: 586, prov: 5, nombre: "Coolife Café Bombón", cat: "Coolife" },
    { id: 587, prov: 5, nombre: "Coolife Cookies Macchiato", cat: "Coolife" },
    { id: 588, prov: 5, nombre: "Red Bull Normal 250ml", cat: "Red Bull" },
    { id: 589, prov: 5, nombre: "Red Bull Grande", cat: "Red Bull" },
    { id: 590, prov: 5, nombre: "Red Bull Maxi Lata", cat: "Red Bull" },
    { id: 591, prov: 5, nombre: "Red Bull Pomelo Lila", cat: "Red Bull" },
    { id: 592, prov: 5, nombre: "Red Bull Iced Vainilla", cat: "Red Bull" },
    { id: 593, prov: 5, nombre: "Red Bull Sandía", cat: "Red Bull" },
    { id: 594, prov: 5, nombre: "Red Bull Melocotón Blanco", cat: "Red Bull" },
    { id: 595, prov: 5, nombre: "Red Bull Albaricoque Fresa", cat: "Red Bull" },
    { id: 596, prov: 5, nombre: "Red Bull Curuba", cat: "Red Bull" },
    { id: 597, prov: 5, nombre: "Red Bull Albaricoque", cat: "Red Bull" },
    { id: 598, prov: 5, nombre: "Red Bull Coco", cat: "Red Bull" },
    { id: 599, prov: 5, nombre: "Red Bull Verde", cat: "Red Bull" },
    { id: 600, prov: 5, nombre: "Red Bull Rosado", cat: "Red Bull" },
    { id: 601, prov: 5, nombre: "Red Bull Violeta", cat: "Red Bull" },
    { id: 602, prov: 5, nombre: "Red Bull Rosa", cat: "Red Bull" },
    { id: 603, prov: 5, nombre: "Red Bull Cereza Cherry", cat: "Red Bull" },
    { id: 604, prov: 5, nombre: "Red Bull Manzana Jengibre", cat: "Red Bull" },
    { id: 605, prov: 5, nombre: "Red Bull Winter Edition", cat: "Red Bull" },
    { id: 606, prov: 5, nombre: "Red Bull Spring Edition Pomelo", cat: "Red Bull" },
    { id: 607, prov: 5, nombre: "Red Bull Lima", cat: "Red Bull" },
    { id: 608, prov: 5, nombre: "Red Bull Violeta Spring Edition", cat: "Red Bull" },
    { id: 609, prov: 5, nombre: "Mentos Red Fruits", cat: "Caramelos" },
    { id: 610, prov: 5, nombre: "Mentos Miel Limón", cat: "Caramelos" },
    { id: 611, prov: 5, nombre: "Mentos Rainbow", cat: "Caramelos" },
    { id: 612, prov: 5, nombre: "Mentos Menta", cat: "Caramelos" },
    { id: 613, prov: 5, nombre: "Mentos Red Fruit Mix", cat: "Caramelos" },
    { id: 614, prov: 5, nombre: "Mentos Discovery", cat: "Caramelos" },
    { id: 615, prov: 5, nombre: "Mentos Fruits", cat: "Caramelos" },
    { id: 616, prov: 5, nombre: "Mentos Fresa Mix", cat: "Caramelos" },
    { id: 617, prov: 5, nombre: "Mentos Berry", cat: "Caramelos" },
    { id: 618, prov: 5, nombre: "Mentos Fresa", cat: "Caramelos" },
    { id: 619, prov: 5, nombre: "Mentos Red Berry", cat: "Caramelos" },
    { id: 620, prov: 5, nombre: "Halls Fresa", cat: "Caramelos" },
    { id: 621, prov: 5, nombre: "Halls Azul", cat: "Caramelos" },
    { id: 622, prov: 5, nombre: "Halls Negro", cat: "Caramelos" },
    { id: 623, prov: 5, nombre: "Halls Miel Limón", cat: "Caramelos" },
    { id: 624, prov: 5, nombre: "Halls Sandía", cat: "Caramelos" },
    { id: 625, prov: 5, nombre: "Pringles Grande Sour Cream", cat: "Pringles" },
    { id: 626, prov: 5, nombre: "Pringles Grande Original", cat: "Pringles" },
    { id: 627, prov: 5, nombre: "Pringles Grande Paprika", cat: "Pringles" },
    { id: 628, prov: 5, nombre: "Pringles Grande Mario", cat: "Pringles" },
    { id: 629, prov: 5, nombre: "Pringles Grande Hot Sour Cream", cat: "Pringles" },
    { id: 630, prov: 5, nombre: "Pringles Grande Sal Vinagre", cat: "Pringles" },
    { id: 631, prov: 5, nombre: "Pringles Grande Pizza", cat: "Pringles" },
    { id: 632, prov: 5, nombre: "Pringles Grande Barbacoa", cat: "Pringles" },
    { id: 633, prov: 5, nombre: "Pringles Grande Cheesy Cheese", cat: "Pringles" },
    { id: 634, prov: 5, nombre: "Pringles Grande Jamón", cat: "Pringles" },
    { id: 635, prov: 5, nombre: "Pringles Grande Original Rojo", cat: "Pringles" },
  ]
};

const INITIAL_USERS = [
  { id: "admin1", usuario: "admin", contrasena: "1234", nombre: "Verónica (Propietaria)", rol: "admin" },
  { id: "enc1", usuario: "juan", contrasena: "juan2026", nombre: "Juan - Encargado", rol: "encargado" },
  { id: "enc2", usuario: "maria", contrasena: "maria2026", nombre: "María - Encargado", rol: "encargado" },
];

const VIEWS = { BUSCAR: "buscar", RECORRIDO: "recorrido", PEDIDO: "pedido", EMPLEADOS: "empleados" };

export default function App() {
  useState(() => {
    const m = document.querySelector('meta[name="viewport"]');
    if (m) m.setAttribute("content", "width=device-width, initial-scale=1, maximum-scale=1");
  });

  const [usuarios, setUsuarios] = useState(INITIAL_USERS);
  const [currentUser, setCurrentUser] = useState(null);
  const [inputUser, setInputUser] = useState("");
  const [inputPass, setInputPass] = useState("");
  const [loginError, setLoginError] = useState("");
  const [dbProductos, setDbProductos] = useState(INITIAL_DB.productos);
  const [view, setView] = useState(VIEWS.BUSCAR);
  const [busqueda, setBusqueda] = useState("");
  const [faltantes, setFaltantes] = useState({});
  const [cantidades, setCantidades] = useState({});
  const [provFiltro, setProvFiltro] = useState(0);
  const [copiado, setCopiado] = useState({});
  const [addingTo, setAddingTo] = useState(null);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [newEmpUser, setNewEmpUser] = useState("");
  const [newEmpPass, setNewEmpPass] = useState("");
  const [newEmpNombre, setNewEmpNombre] = useState("");
  const [showNewEmp, setShowNewEmp] = useState(false);
  const [editando, setEditando] = useState(null); // {id, nombre, cat}
  const [nuevaCat, setNuevaCat] = useState(null); // {provId, nombre}
  const [nombreNuevaCat, setNombreNuevaCat] = useState("");

  const crearCategoria = (provId) => {
    if (!nombreNuevaCat.trim()) return;
    // Add a placeholder product to create the category
    const newId = Date.now();
    setDbProductos(prev => [...prev, { id: newId, prov: provId, nombre: "Nuevo producto", cat: nombreNuevaCat.trim() }]);
    setNombreNuevaCat("");
    setNuevaCat(null);
  };

  const guardarEdicion = () => {
    if (!editando || !editando.nombre.trim()) return;
    setDbProductos(prev => prev.map(p => p.id === editando.id ? { ...p, nombre: editando.nombre.trim(), cat: editando.cat.trim() } : p));
    setEditando(null);
  };

  const eliminarProducto = (id) => {
    setDbProductos(prev => prev.filter(p => p.id !== id));
    setFaltantes(prev => { const n = {...prev}; delete n[id]; return n; });
    setEditando(null);
  };

  const handleLogin = () => {
    const uInput = inputUser.toLowerCase().trim();
    const pInput = inputPass.trim();
    const found = usuarios.find(x => x.usuario.toLowerCase().trim() === uInput && x.contrasena.trim() === pInput);
    if (found) { setCurrentUser(found); setLoginError(""); setInputUser(""); setInputPass(""); }
    else setLoginError("Usuario: " + uInput + " — no encontrado o contraseña incorrecta");
  };

  const handleLogout = () => { setCurrentUser(null); setInputUser(""); setInputPass(""); };

  const agregarEncargado = () => {
    if (!newEmpUser || !newEmpPass || !newEmpNombre) return;
    if (usuarios.find(u => u.usuario.toLowerCase() === newEmpUser.toLowerCase())) { alert("Ese usuario ya existe."); return; }
    setUsuarios(prev => [...prev, { id: "user_" + Date.now(), usuario: newEmpUser.trim(), contrasena: newEmpPass.trim(), nombre: newEmpNombre.trim(), rol: "encargado" }]);
    setNewEmpUser(""); setNewEmpPass(""); setNewEmpNombre(""); setShowNewEmp(false);
  };

  const eliminarEncargado = (id) => {
    if (window.confirm("¿Eliminar este encargado? Perderá el acceso.")) setUsuarios(prev => prev.filter(u => u.id !== id));
  };

  const agregarProducto = (provId, cat) => {
    if (!nuevoNombre.trim()) return;
    setDbProductos(prev => [...prev, { id: Date.now(), prov: provId, nombre: nuevoNombre.trim(), cat }]);
    setNuevoNombre(""); setAddingTo(null);
  };

  const totalFaltantes = Object.values(faltantes).filter(Boolean).length;

  const productosFiltrados = useMemo(() =>
    provFiltro === 0 ? dbProductos : dbProductos.filter(p => p.prov === provFiltro),
    [provFiltro, dbProductos]);

  const resultados = useMemo(() => {
    if (!busqueda.trim()) return [];
    return dbProductos.filter(p => p.nombre.toLowerCase().includes(busqueda.toLowerCase()));
  }, [busqueda, dbProductos]);

  const pedidoPorProv = useMemo(() => {
    const items = dbProductos.filter(p => faltantes[p.id]);
    const map = {};
    items.forEach(p => { if (!map[p.prov]) map[p.prov] = []; map[p.prov].push(p); });
    return map;
  }, [faltantes, dbProductos]);

  const getProv = (id) => INITIAL_DB.proveedores.find(p => p.id === id);
  const toggleFaltante = (id) => setFaltantes(prev => ({ ...prev, [id]: !prev[id] }));
  const setCantidad = (id, val) => setCantidades(prev => ({ ...prev, [id]: val }));

  // Múltiplos obligatorios por producto
  const getMultiplo = (prod) => {
    // Ombu surtidos + Gouda → múltiplos de 5
    if (prod.prov === 18 && prod.cat === "Surtidos + Gouda") return 5;
    // Corona Pack Botellas 6 → múltiplos de 6
    if (prod.id === 47) return 6;
    // Heineken Latas 33cl Promo → múltiplos de 5
    if (prod.id === 40) return 5;
    return null;
  };

  const validarMultiplo = (prod, val) => {
    const multiplo = getMultiplo(prod);
    if (!multiplo || !val || val === "") return true;
    return Number(val) % multiplo === 0;
  };

  const generarMensaje = (provId) => {
    const prov = getProv(provId);
    const items = pedidoPorProv[provId];
    const lista = items.map(p => { const c = cantidades[p.id]; return `${p.nombre}${c ? ` ${c}` : ""}`; }).join("\n");
    return `Hola ${prov.nombre}, pedido Supermercado:\n\n${lista}\n\nGracias`;
  };

  const copiar = (provId) => {
    navigator.clipboard.writeText(generarMensaje(provId)).catch(() => {});
    setCopiado(p => ({ ...p, [provId]: true }));
    setTimeout(() => setCopiado(p => ({ ...p, [provId]: false })), 2000);
  };

  const whatsapp = (provId) => {
    const prov = getProv(provId);
    const numero = prov.tel ? prov.tel.replace(/[^0-9]/g, "") : "";
    const url = numero ? `https://wa.me/${numero}?text=${encodeURIComponent(generarMensaje(provId))}` : `https://wa.me/?text=${encodeURIComponent(generarMensaje(provId))}`;
    window.open(url, "_blank");
  };

  const isAdmin = currentUser?.rol === "admin";

  // ── LOGIN ──
  if (!currentUser) return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", background: "#F8F7F4", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700&family=DM+Serif+Display&display=swap" rel="stylesheet" />
      <div style={{ background: "#fff", padding: "32px 24px", borderRadius: 16, width: "100%", maxWidth: 380, boxShadow: "0 4px 24px rgba(0,0,0,0.06)", border: "1px solid #eee" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 34, marginBottom: 4 }}>Supermercado</div>
          <div style={{ fontSize: 13, color: "#999" }}>Sistema de gestión de pedidos</div>
        </div>
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#999", textTransform: "uppercase", marginBottom: 6 }}>Usuario</div>
          <input value={inputUser} onChange={e => setInputUser(e.target.value)} onKeyDown={e => e.key === "Enter" && handleLogin()}
            placeholder="tu usuario" autoComplete="off" autoCorrect="off" autoCapitalize="none" spellCheck="false" style={{ width: "100%", boxSizing: "border-box", padding: "12px", borderRadius: 8, border: "1px solid #ddd", fontSize: 16, outline: "none" }} />
        </div>
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#999", textTransform: "uppercase", marginBottom: 6 }}>Contraseña</div>
          <input value={inputPass} onChange={e => setInputPass(e.target.value)} onKeyDown={e => e.key === "Enter" && handleLogin()}
            placeholder="Contraseña" autoComplete="off" autoCorrect="off" autoCapitalize="none" spellCheck="false" style={{ width: "100%", boxSizing: "border-box", padding: "12px", borderRadius: 8, border: "1px solid #ddd", fontSize: 16, outline: "none" }} />
        </div>
        {loginError && <div style={{ color: "#ef4444", fontSize: 13, marginBottom: 12, textAlign: "center" }}>{loginError}</div>}
        <button onClick={handleLogin} style={{ width: "100%", padding: 14, background: "#1a1a1a", color: "white", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: "pointer" }}>Entrar</button>
        <div style={{ marginTop: 20, padding: "12px", background: "#f8f8f8", borderRadius: 8, fontSize: 12, color: "#888" }}>
          <div style={{ fontWeight: 700, marginBottom: 4 }}>Usuarios de prueba:</div>
          <div>👑 admin / 1234</div>
          <div>👤 juan / juan2026</div>
          <div>👤 maria / maria2026</div>
        </div>
      </div>
    </div>
  );

  // ── APP ──
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", background: "#F8F7F4", color: "#1a1a1a" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700&family=DM+Serif+Display&display=swap" rel="stylesheet" />

      {/* HEADER */}
      <div style={{ background: "#1a1a1a", padding: "16px 20px 0", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 580, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: "#fff" }}>Supermercado</span>
              <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", background: isAdmin ? "#f59e0b22" : "#3b82f622", color: isAdmin ? "#f59e0b" : "#3b82f6", padding: "2px 6px", borderRadius: 4 }}>{isAdmin ? "👑 Admin" : "👤 " + currentUser.nombre}</span>
            </div>
            <button onClick={handleLogout} style={{ background: "none", border: "1px solid #444", color: "#aaa", fontSize: 11, padding: "4px 10px", borderRadius: 6, cursor: "pointer" }}>Salir</button>
          </div>
          <div style={{ display: "flex", borderTop: "1px solid #2a2a2a" }}>
            {[
              { key: VIEWS.BUSCAR, label: "🔍 Buscar" },
              { key: VIEWS.RECORRIDO, label: "📋 Recorrido" },
              { key: VIEWS.PEDIDO, label: `📦 Pedido${totalFaltantes > 0 ? ` (${totalFaltantes})` : ""}` },
              ...(isAdmin ? [{ key: VIEWS.EMPLEADOS, label: "👥 Personal" }] : [])
            ].map(v => (
              <button key={v.key} onClick={() => setView(v.key)} style={{ flex: 1, padding: "11px 4px", border: "none", background: "none", cursor: "pointer", fontSize: 12, fontWeight: view === v.key ? 700 : 400, color: view === v.key ? "#fff" : "#555", borderBottom: view === v.key ? "2px solid #fff" : "2px solid transparent" }}>{v.label}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 580, margin: "0 auto", padding: "16px" }}>

        {/* BUSCAR */}
        {view === VIEWS.BUSCAR && (
          <div>
            <input placeholder="¿A quién le pido el Marlboro Gold?" value={busqueda} onChange={e => setBusqueda(e.target.value)}
              style={{ width: "100%", boxSizing: "border-box", padding: "14px 16px", fontSize: 16, borderRadius: 12, border: "2px solid #e5e5e5", outline: "none", background: "#fff", marginBottom: 16 }} />
            {busqueda && resultados.length === 0 && <div style={{ textAlign: "center", padding: "40px 20px", color: "#999" }}>🤷 No encontrado en la base de datos</div>}
            {resultados.map(prod => {
              const prov = getProv(prod.prov);
              return (
                <div key={prod.id} style={{ background: "#fff", borderRadius: 12, padding: "14px 16px", marginBottom: 8, border: "1px solid #eee" }}>
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{prod.nombre}</div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <span style={{ fontSize: 11, background: prov.color + "18", color: prov.color, padding: "2px 8px", borderRadius: 20, fontWeight: 700 }}>{prov.emoji} {prov.nombre}</span>
                    <span style={{ fontSize: 11, color: "#999" }}>{prod.cat}</span>
                  </div>
                </div>
              );
            })}
            {!busqueda && (
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#999", textTransform: "uppercase", marginBottom: 12 }}>Proveedores</div>
                {INITIAL_DB.proveedores.map(prov => (
                  <div key={prov.id} onClick={() => { setProvFiltro(prov.id); setView(VIEWS.RECORRIDO); }} style={{ background: "#fff", borderRadius: 12, padding: "14px 16px", marginBottom: 8, border: `1px solid ${prov.color}30`, cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: prov.color + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{prov.emoji}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{prov.nombre}</div>
                      <div style={{ fontSize: 12, color: "#999", marginTop: 1 }}>{dbProductos.filter(p => p.prov === prov.id).length} referencias</div>
                      <div style={{ fontSize: 13, color: prov.color, fontWeight: 600, marginTop: 2 }}>📞 {prov.tel}</div>
                    </div>
                    <div style={{ color: "#ccc" }}>›</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* RECORRIDO */}
        {view === VIEWS.RECORRIDO && (
          <div>
            <div style={{ display: "flex", gap: 6, marginBottom: 14, overflowX: "auto", paddingBottom: 4 }}>
              <button onClick={() => setProvFiltro(0)} style={{ padding: "6px 14px", borderRadius: 20, border: "1px solid #e5e5e5", cursor: "pointer", whiteSpace: "nowrap", fontSize: 12, fontWeight: 600, background: provFiltro === 0 ? "#1a1a1a" : "#fff", color: provFiltro === 0 ? "#fff" : "#666" }}>Todos</button>
              {INITIAL_DB.proveedores.map(p => (
                <button key={p.id} onClick={() => setProvFiltro(p.id)} style={{ padding: "6px 14px", borderRadius: 20, border: "1px solid #e5e5e5", cursor: "pointer", whiteSpace: "nowrap", fontSize: 12, fontWeight: 600, background: provFiltro === p.id ? p.color : "#fff", color: provFiltro === p.id ? "#fff" : "#666" }}>{p.emoji} {p.nombre}</button>
              ))}
            </div>
            {totalFaltantes > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fff", borderRadius: 10, padding: "10px 14px", marginBottom: 12, border: "1px solid #eee" }}>
                <span style={{ fontSize: 13, color: "#666" }}>{totalFaltantes} marcados</span>
                <button onClick={() => setFaltantes({})} style={{ background: "none", border: "none", color: "#ef4444", fontSize: 13, cursor: "pointer", fontWeight: 600 }}>Limpiar todo</button>
              </div>
            )}
            {INITIAL_DB.proveedores.map(prov => {
              const prods = productosFiltrados.filter(p => p.prov === prov.id);
              if (!prods.length) return null;
              const cats = [...new Set(prods.map(p => p.cat))];
              return (
                <div key={prov.id} style={{ marginBottom: 20 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                    <span>{prov.emoji}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: prov.color, textTransform: "uppercase" }}>{prov.nombre}</span>
                    <div style={{ flex: 1, height: 1, background: prov.color + "30" }} />
                  </div>
                  {cats.map(cat => (
                    <div key={cat} style={{ marginBottom: 10 }}>
                      <div style={{ fontSize: 11, color: "#aaa", fontWeight: 700, marginBottom: 4, textTransform: "uppercase" }}>{cat}</div>
                      {prods.filter(p => p.cat === cat).map(prod => {
                        const marcado = faltantes[prod.id];
                        const enEdicion = editando?.id === prod.id;
                        return (
                          <div key={prod.id} style={{ marginBottom: 4 }}>
                            {enEdicion ? (
                              <div style={{ background: "#fff", borderRadius: 10, border: `1px solid ${prov.color}60`, padding: "10px 12px" }}>
                                <input value={editando.nombre} onChange={e => setEditando(prev => ({ ...prev, nombre: e.target.value }))}
                                  style={{ width: "100%", boxSizing: "border-box", padding: "8px 10px", borderRadius: 7, border: "1px solid #ddd", fontSize: 16, marginBottom: 6, outline: "none", fontFamily: "inherit" }} />
                                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                                  <span style={{ fontSize: 11, color: "#999", whiteSpace: "nowrap" }}>Categoría:</span>
                                  <input value={editando.cat} onChange={e => setEditando(prev => ({ ...prev, cat: e.target.value }))}
                                    style={{ flex: 1, padding: "6px 10px", borderRadius: 7, border: "1px solid #ddd", fontSize: 16, outline: "none", fontFamily: "inherit" }} />
                                </div>
                                <div style={{ display: "flex", gap: 6 }}>
                                  <button onClick={guardarEdicion} style={{ flex: 1, padding: "8px", borderRadius: 7, border: "none", background: prov.color, color: "white", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>Guardar</button>
                                  <button onClick={() => setEditando(prev => ({ ...prev, confirmarEliminar: !prev.confirmarEliminar }))}
                                    style={{ padding: "8px 12px", borderRadius: 7, border: "none", background: editando?.confirmarEliminar ? "#ef4444" : "#fef2f2", color: editando?.confirmarEliminar ? "white" : "#ef4444", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>
                                    {editando?.confirmarEliminar ? "¿Seguro? Toca de nuevo" : "🗑 Eliminar"}
                                  </button>
                                  <button onClick={() => setEditando(null)} style={{ padding: "8px 12px", borderRadius: 7, border: "none", background: "#f5f5f5", color: "#666", cursor: "pointer", fontSize: 13 }}>✕</button>
                                </div>
                                {editando?.confirmarEliminar && (
                                  <button onClick={() => eliminarProducto(prod.id)} style={{ width: "100%", marginTop: 6, padding: "10px", borderRadius: 7, border: "none", background: "#ef4444", color: "white", fontWeight: 700, cursor: "pointer", fontSize: 14 }}>
                                    ✕ Confirmar eliminación
                                  </button>
                                )}
                              </div>
                            ) : (
                              <div style={{ display: "flex", alignItems: "center", borderRadius: 10, border: `1px solid ${marcado ? prov.color + "50" : "#eee"}`, background: marcado ? prov.color + "10" : "#fff", overflow: "hidden" }}>
                                <button onClick={() => toggleFaltante(prod.id)} style={{ flex: 1, display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", border: "none", background: "none", cursor: "pointer", textAlign: "left" }}>
                                  <div style={{ width: 20, height: 20, borderRadius: 6, flexShrink: 0, border: `2px solid ${marcado ? prov.color : "#ddd"}`, background: marcado ? prov.color : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "white", fontWeight: 700 }}>{marcado ? "✓" : ""}</div>
                                  <span style={{ fontSize: 13, color: marcado ? "#1a1a1a" : "#555", fontWeight: marcado ? 600 : 400 }}>{prod.nombre}</span>
                                </button>
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "0 6px" }}>
                                  <input
                                    type="number"
                                    placeholder="0"
                                    value={cantidades[prod.id] || ""}
                                    onChange={e => {
                                      const val = e.target.value;
                                      setCantidad(prod.id, val);
                                      if (val && val !== "0" && !faltantes[prod.id]) toggleFaltante(prod.id);
                                      if ((!val || val === "0") && faltantes[prod.id]) toggleFaltante(prod.id);
                                    }}
                                    onClick={e => e.stopPropagation()}
                                    style={{ width: 55, padding: "6px 4px", borderRadius: 6, border: `1px solid ${!validarMultiplo(prod, cantidades[prod.id]) ? "#ef4444" : marcado ? prov.color + "60" : "#e0e0e0"}`, background: !validarMultiplo(prod, cantidades[prod.id]) ? "#fef2f2" : marcado ? prov.color + "08" : "#fafafa", fontSize: 16, fontWeight: 600, outline: "none", textAlign: "center", fontFamily: "inherit", color: "#1a1a1a" }}
                                  />
                                  {getMultiplo(prod) && (
                                    <span style={{ fontSize: 9, color: !validarMultiplo(prod, cantidades[prod.id]) ? "#ef4444" : "#aaa", marginTop: 2, whiteSpace: "nowrap" }}>
                                      ×{getMultiplo(prod)}
                                    </span>
                                  )}
                                </div>
                                {isAdmin && (
                                  <button onClick={() => setEditando({ id: prod.id, nombre: prod.nombre, cat: prod.cat })}
                                    style={{ padding: "10px 8px", border: "none", background: "none", color: "#ccc", cursor: "pointer", fontSize: 13 }}>✏️</button>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                      {isAdmin && (
                        addingTo?.provId === prov.id && addingTo?.cat === cat ? (
                          <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                            <input autoFocus placeholder="Nombre del producto..." value={nuevoNombre} onChange={e => setNuevoNombre(e.target.value)}
                              onKeyDown={e => { if (e.key === "Enter") agregarProducto(prov.id, cat); if (e.key === "Escape") { setAddingTo(null); setNuevoNombre(""); } }}
                              style={{ flex: 1, padding: "8px 12px", borderRadius: 8, border: `1px solid ${prov.color}60`, fontSize: 16, outline: "none", fontFamily: "inherit" }} />
                            <button onClick={() => agregarProducto(prov.id, cat)} style={{ padding: "8px 12px", borderRadius: 8, border: "none", background: prov.color, color: "white", fontWeight: 700, cursor: "pointer" }}>✓</button>
                            <button onClick={() => { setAddingTo(null); setNuevoNombre(""); }} style={{ padding: "8px 10px", borderRadius: 8, border: "none", background: "#f5f5f5", color: "#999", cursor: "pointer" }}>✕</button>
                          </div>
                        ) : (
                          <button onClick={() => { setAddingTo({ provId: prov.id, cat }); setNuevoNombre(""); }} style={{ width: "100%", padding: "7px", borderRadius: 8, border: `1px dashed ${prov.color}40`, background: "transparent", color: prov.color, fontSize: 12, fontWeight: 600, cursor: "pointer", marginTop: 2 }}>+ Agregar a {cat}</button>
                        )
                      )}
                    </div>
                  ))}
                  {isAdmin && (
                    nuevaCat?.provId === prov.id ? (
                      <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                        <input autoFocus placeholder="Nombre de la nueva categoría..." value={nombreNuevaCat} onChange={e => setNombreNuevaCat(e.target.value)}
                          onKeyDown={e => { if (e.key === "Enter") crearCategoria(prov.id); if (e.key === "Escape") { setNuevaCat(null); setNombreNuevaCat(""); } }}
                          style={{ flex: 1, padding: "8px 12px", borderRadius: 8, border: `2px solid ${prov.color}`, fontSize: 16, outline: "none", fontFamily: "inherit" }} />
                        <button onClick={() => crearCategoria(prov.id)} style={{ padding: "8px 12px", borderRadius: 8, border: "none", background: prov.color, color: "white", fontWeight: 700, cursor: "pointer" }}>✓</button>
                        <button onClick={() => { setNuevaCat(null); setNombreNuevaCat(""); }} style={{ padding: "8px 10px", borderRadius: 8, border: "none", background: "#f5f5f5", color: "#999", cursor: "pointer" }}>✕</button>
                      </div>
                    ) : (
                      <button onClick={() => { setNuevaCat({ provId: prov.id }); setNombreNuevaCat(""); }} style={{ width: "100%", marginTop: 8, padding: "8px", borderRadius: 8, border: `1px dashed ${prov.color}60`, background: prov.color + "08", color: prov.color, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                        + Nueva categoría en {prov.nombre}
                      </button>
                    )
                  )}
                </div>
              );
            })}
            {totalFaltantes > 0 && (
              <button onClick={() => setView(VIEWS.PEDIDO)} style={{ width: "100%", padding: 14, borderRadius: 12, border: "none", background: "#1a1a1a", color: "white", fontSize: 15, fontWeight: 700, cursor: "pointer", marginTop: 8 }}>Ver pedidos ({totalFaltantes}) →</button>
            )}
          </div>
        )}

        {/* PEDIDO */}
        {view === VIEWS.PEDIDO && (
          <div>
            {!Object.keys(pedidoPorProv).length ? (
              <div style={{ textAlign: "center", padding: "60px 20px", color: "#bbb" }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
                <div style={{ fontWeight: 700, fontSize: 18 }}>Sin faltantes marcados</div>
                <button onClick={() => setView(VIEWS.RECORRIDO)} style={{ marginTop: 16, padding: "10px 24px", borderRadius: 10, border: "1px solid #e5e5e5", background: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>Ir al recorrido</button>
              </div>
            ) : Object.entries(pedidoPorProv).map(([provId, items]) => {
              const prov = getProv(Number(provId));
              return (
                <div key={provId} style={{ background: "#fff", borderRadius: 14, marginBottom: 16, overflow: "hidden", border: `1px solid ${prov.color}25` }}>
                  <div style={{ padding: "14px 16px", background: prov.color + "10", borderBottom: `1px solid ${prov.color}20` }}>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{prov.emoji} {prov.nombre}</div>
                    <div style={{ fontSize: 12, color: "#999", marginTop: 2 }}>{items.length} producto{items.length > 1 ? "s" : ""} · 📞 {prov.tel}</div>
                  </div>
                  <div style={{ padding: "8px 16px" }}>
                    {items.map(p => (
                      <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderBottom: "1px solid #f8f8f8", fontSize: 13 }}>
                        <span>{p.nombre}</span>
                        {cantidades[p.id] && <span style={{ fontWeight: 700, background: "#f5f5f5", padding: "2px 8px", borderRadius: 6, fontSize: 12 }}>{cantidades[p.id]}</span>}
                      </div>
                    ))}
                  </div>
                  <div style={{ padding: "12px 16px", display: "flex", gap: 8 }}>
                    <button onClick={() => copiar(Number(provId))} style={{ flex: 1, padding: "10px", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 700, background: copiado[provId] ? "#10b981" : "#f5f5f5", color: copiado[provId] ? "white" : "#333", transition: "all 0.2s" }}>{copiado[provId] ? "✓ Copiado" : "📋 Copiar"}</button>
                    <button onClick={() => whatsapp(Number(provId))} style={{ flex: 1, padding: "10px", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 700, background: "#25D366", color: "white" }}>💬 WhatsApp</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* PERSONAL (solo admin) */}
        {view === VIEWS.EMPLEADOS && isAdmin && (
          <div>
            {showNewEmp ? (
              <div style={{ background: "#fff", borderRadius: 14, padding: 16, marginBottom: 16, border: "1px solid #eee" }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>Nuevo encargado</div>
                {[["newEmpNombre", "Nombre completo", newEmpNombre, setNewEmpNombre], ["newEmpUser", "Usuario (para login)", newEmpUser, setNewEmpUser], ["newEmpPass", "Contraseña", newEmpPass, setNewEmpPass]].map(([key, ph, val, set]) => (
                  <input key={key} placeholder={ph} value={val} onChange={e => set(e.target.value)}
                    style={{ width: "100%", boxSizing: "border-box", padding: "11px 12px", borderRadius: 8, border: "1px solid #e0e0e0", fontSize: 16, marginBottom: 8, outline: "none", fontFamily: "inherit" }} />
                ))}
                <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                  <button onClick={agregarEncargado} style={{ flex: 1, padding: 12, background: "#1a1a1a", color: "white", border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer" }}>Crear cuenta</button>
                  <button onClick={() => setShowNewEmp(false)} style={{ flex: 1, padding: 12, background: "#f5f5f5", color: "#666", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer" }}>Cancelar</button>
                </div>
              </div>
            ) : (
              <button onClick={() => setShowNewEmp(true)} style={{ width: "100%", padding: 14, background: "#1a1a1a", color: "white", border: "none", borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: "pointer", marginBottom: 16 }}>+ Crear nuevo encargado</button>
            )}
            <div style={{ fontSize: 12, fontWeight: 700, color: "#999", textTransform: "uppercase", marginBottom: 10 }}>Cuentas activas</div>
            {usuarios.map(u => (
              <div key={u.id} style={{ background: "#fff", padding: "14px 16px", borderRadius: 12, marginBottom: 8, border: "1px solid #eee", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{u.nombre}</div>
                  <div style={{ fontSize: 12, color: "#999", marginTop: 2 }}>@{u.usuario} · {u.rol === "admin" ? "👑 Propietaria" : "👤 Encargado"}</div>
                </div>
                {u.rol !== "admin" && (
                  <button onClick={() => eliminarEncargado(u.id)} style={{ background: "#fef2f2", border: "none", color: "#ef4444", padding: "6px 12px", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Eliminar</button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
