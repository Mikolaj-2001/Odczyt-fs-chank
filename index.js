#!/usr/bin/env node

// Import wbudowanego modułu 'fs' do operacji na plikach
import fs from 'fs';
// Import biblioteki 'chalk' do kolorowania tekstu w terminalu
import chalk from 'chalk';

// Pobranie ścieżki do pliku z argumentów wiersza poleceń
// process.argv zawiera tablicę argumentów przekazanych do skryptu
// process.argv[0] - ścieżka do Node.js
// process.argv[1] - ścieżka do bieżącego skryptu
// process.argv[2] - pierwszy argument użytkownika (ścieżka do pliku)
const filePath = process.argv[2];

// Sprawdzenie, czy użytkownik podał ścieżkę do pliku
if (!filePath) {
    console.error(
        chalk.red(
            '❌ Błąd: Nie podano ścieżki do pliku!\nUżycie: node reader.js <ścieżka_do_pliku>'
        )
    );
    process.exit(1); // Zakończenie działania programu z kodem błędu 1
}

// Funkcja do asynchronicznego odczytu pliku
const readFile = async (path) => {
    try {
        // Odczytanie pliku w formacie UTF-8 (czytelny dla tekstu)
        const data = await fs.promises.readFile(path, 'utf8');

        // Wyświetlenie nagłówka informacyjnego w kolorze zielonym
        console.log(chalk.green.bold('📖 Zawartość pliku:\n'));

        // Podział pliku na linie (w przypadku dużych plików zwiększa czytelność)
        const lines = data.split('\n');

        // Iteracja po każdej linii i wyświetlenie z numeracją
        lines.forEach((line, index) => {
            console.log(chalk.blue(`${index + 1}: ${line}`));
        });

        // Pusta linia dla lepszej czytelności
        console.log('');
    } catch (error) {
        // Obsługa błędów (np. plik nie istnieje, brak dostępu)
        console.error(chalk.red(`❌ Błąd odczytu pliku: ${error.message}`));
    }
};

// Wywołanie funkcji odczytu pliku
readFile(filePath);
