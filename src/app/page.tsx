'use client'

import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./lib/hooks";
import { getCharacters, getLocations } from "./lib/api";
import { Character } from "@/types/Character";
import { setCharacters } from "@/features/characters";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import "./globals.css";
import { Location } from "@/types/Location";
import SelectGender from "./ui/SelectGender";
import SelectStatus from "./ui/SelectStatus";
import SelectSpecies from "./ui/SelectSpecies";
import { TextField } from "@mui/material";
import { current } from "@reduxjs/toolkit";

export default function Home() {
  const dispatch = useAppDispatch();
  const characters = useAppSelector(state => state.characters);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }

  useEffect(() => {
    setFilteredCharacters(characters.filter((character) =>
      character.name.toLowerCase().includes(searchTerm.toLowerCase())
    ))
  }, [characters, searchTerm])

  useEffect(() => {
    const fetchCharactersWithLocations = async () => {
      try {
        setIsLoading(true);
        const fetchCharacters: Character[] = await getCharacters(currentPage);
        const fetchLocations: Location[] = await getLocations();

        setTotalPages(15)

        const charactersWithLocations = fetchCharacters.map(character => {
          const characterLocation = fetchLocations.find(location => location.url === character.location.url)

          return {
            ...character,
            locationData: characterLocation || null,
          }
        })

        dispatch(setCharacters(charactersWithLocations));
      }
      catch {
        throw new Error('Failed to fetch characters');
      } finally {
        setIsLoading(false);
      }
    }

    fetchCharactersWithLocations();
  }, [dispatch, currentPage])

  const pathname = usePathname();

  const renderPageButtons = () => {
    const pageButtons = [];
    const maxButtons = 4;

    let startPage = Math.max(currentPage - Math.floor(maxButtons / 2), 1);
    let endPage = startPage + maxButtons - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - maxButtons + 1, 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          disabled={currentPage === i}
          className="w-10 h-10 border border-gray-400 items-center font-semibold"
        >
          {i}
        </button>
      )
    }

    return pageButtons;
  }

  return (
    <div className="bg-white">

      <header className="flex flex-row justify-between pr-10 pl-10 pt-4 pb-4">
        <Image src="/images/Rick_and_Morty_logo.avif" alt="rick and morty logo" width={50} height={50} />

        <div className="font-medium place-items-center text-center pt-3">
          <Link href={'/characters'} className={clsx('pr-8', {'font-bold': pathname === '/'})}>Characters</Link>
          <Link href={'/locations'} className={clsx('pr-8', {'font-bold': pathname === '/location'})}>Locations</Link>
          <Link href={'/episodes'} className={clsx('pr-8', {'font-bold': pathname === '/episode'})}>Episodes</Link>
        </div>
      </header>

      <hr className="w-full border border-gray-400" />

      <div className="w-full flex justify-center p-10">
        <Image src="/images/Rick_and_Morty.png" alt="rick and morty" width={900} height={200} />
      </div>

      <div className="flex flex-row gap-6 justify-center items-center p-10">
        <TextField
          id="standard-search"
          label="Search character..."
          type="search"
          variant="outlined"
          className="w-full"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <SelectSpecies />
        <SelectStatus />
        <SelectGender />
      </div>

      <main className="grid grid-cols-4 gap-4 bg-center min-h-screen flex-col items-center p-10">
        {filteredCharacters.map(character => {
          let statusText;
          let statusClass;

          switch (character.status) {
            case 'Alive':
              statusText = 'Alive'
              statusClass = 'border border-green-300 pt-1 pb-1 pr-3 pl-3 text-green-600'
              break;
            case 'Dead':
              statusText = 'Dead'
              statusClass = 'border border-red-300 pt-1 pb-1 pr-3 pl-3 text-red-600'
              break;
            case 'unknown':
              statusText = 'Unknown'
              statusClass = 'border border-gray-300 pt-1 pb-1 pr-3 pl-3 text-gray-600'
          }

          return (
            <div key={character.id} className="border border-black p-4 bg-white rounded-lg flex flex-col transition-transform duration-300 transform hover:scale-105 cursor-pointer">
              <Link href={`/characters/${character.id}`}>
                <h2 className="text-center font-bold text-xl">{character.name}</h2>
                <div className="flex flex-row justify-between">
                  <Image src={character.image} alt={character.name} width={200} height={200} className="items-right mt-4 rounded-full" />
                  <div className="flex flex-col">
                    <p className={`${statusClass} font-semibold m-5 text-center`}>{statusText}</p>
                    <div className="border border-blue-400 pt-1 pb-1 pr-3 pl-3 ml-5">
                      <p className="font-semibold text-blue-400 text-center">Last location:</p>
                      <p className="font-medium text-sm text-center">{character.location.name}</p>
                    </div>
                    <div className="border border-yellow-300 pt-1 pb-1 pr-3 pl-3 ml-5 mt-4">
                      <p className="text-center font-semibold">{character.species}</p>
                    </div>
                  </div>
                </div>
              </Link>

            </div>
        )})}
      </main>

      <div className="flex gap-7 justify-center pb-10">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="w-10 h-10 border border-gray-400 items-center font-semibold">👈</button>
        {renderPageButtons()}
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="w-10 h-10 border border-gray-400 items-center font-semibold">👉</button>
      </div>

      <footer className="text-center pt-4 pb-4">
        <hr className="w-full border border-gray-400" />
        <h2 className="font-bold text-lg pt-4">Made Veronika Demko for Rick and Morty ❤️</h2> 
      </footer>
    </div>
  );
}
