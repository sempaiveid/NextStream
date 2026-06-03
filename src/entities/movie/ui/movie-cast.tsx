import Image from "next/image";

import { TMDB_IMAGE_URL } from "../api/tmdb";
import type { CastMember } from "../model/types";

interface MovieCastProps {
  cast: CastMember[];
}

export function MovieCast({ cast }: MovieCastProps) {
  if (!cast.length) return null;

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-4">Cast</h2>
      <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
        {cast.map((member) => (
          <div key={member.id} className="text-center">
            <div className="relative w-full aspect-2/3 rounded-md overflow-hidden bg-zinc-800 mb-1.5">
              {member.profile_path ? (
                <Image
                  src={`${TMDB_IMAGE_URL}/w185${member.profile_path}`}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-600 text-2xl">?</div>
              )}
            </div>
            <p className="text-white text-xs font-medium truncate">{member.name}</p>
            <p className="text-gray-500 text-[10px] truncate">{member.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
