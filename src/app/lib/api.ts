import { Location } from "@/types/Location";
import { Character } from "@/types/Character";
import { useEffect, useState } from "react";

const BASE_URL = 'https://rickandmortyapi.com/api';

function wait(delay: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

function get<T>(url: string): Promise<T> {
  const fullUrl = BASE_URL + url;

  return wait(300)
    .then(() => fetch(fullUrl))
    .then(res => res.json())
}

export const getCharacters = (page: number = 1) => get<{ results: Character[] }>(`/character/?page=${page}`).then(data => data.results);
export const getCharactersById = (id: number) => get<{ results: Character }>(`/character/${id}`).then(data => data.results);
export const getLocations = () => get<{ results: Location[] }>('/location').then(data => data.results);
export const getEpisodes = () => get('/episode');