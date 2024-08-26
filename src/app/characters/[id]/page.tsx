import { getCharactersById } from "@/app/lib/api";
import { Character } from "@/types/Character";
import { GetServerSideProps } from "next";
import Image from "next/image";

type Props = {
  params: {
    id: string,
  }
}

export const CharacterPage = async ({params}: Props) => {
  const { id } = params;
  const character: Character = await getCharactersById(parseInt(id));

  if (!character) {
    return <div>Oops.. Character not found</div>
  }

  return (
    <div className="bg-white">
      <h2>{character.name}</h2>
      <Image src={character.image} alt={character.name} width={300} height={300} />
      <p>{character.status}</p>
      <p>Gender: {character.gender}</p>
      <p>Location: {character.location.name}</p>
      <p>Origin: {character.origin?.name}</p>
      <p>Species: {character.species}</p>
    </div>
  )
}

export default CharacterPage;