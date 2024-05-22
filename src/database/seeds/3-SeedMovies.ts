import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import { Movie } from 'src/movie/entities/movies.entity';

export class CreateMoviesSeed implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
      const moviesData = [
        {
          id: 823464,
          name: 'Godzilla x Kong: The New Empire',
          description: 'Following their explosive showdown, Godzilla and Kong must reunite against a colossal undiscovered threat hidden within our world, challenging their very existence – and our own.',
          release_date: '2024-03-27',
        },
        {
          id: 653346,
          name: 'Kingdom of the Planet of the Apes',
          description: 'Several generations in the future following Caesar\'s reign, apes are now the dominant species and live harmoniously while humans have been reduced to living in the shadows. As a new tyrannical ape leader builds his empire, one young ape undertakes a harrowing journey that will cause him to question all that he has known about the past and to make choices that will define a future for apes and humans alike.',
          release_date: '2024-05-08',
        },
        {
          id: 940721,
          name: 'Godzilla Minus One',
          description: 'Postwar Japan is at its lowest point when a new crisis emerges in the form of a giant monster, baptized in the horrific power of the atomic bomb.',
          release_date: 'U2023-11-03',
        },
        {
          id: 1219685,
          name: 'Un père idéal',
          description: '',
          release_date: '2024-04-21',
        },
        {
          id: 996154,
          name: 'Black Lotus',
          description: 'An ex-special forces operative wages a one man war through the streets of Amsterdam to rescue his friend\'s daughter from the local crime syndicate.',
          release_date: '2023-04-12',
        },
        {
          id: 1093995,
          name: 'Chief of Station',
          description: 'After learning that the death of his wife was not an accident, a former CIA Station Chief is forced back into the espionage underworld, teaming up with an adversary to unravel a conspiracy that challenges everything he thought he knew.',
          release_date: '2024-05-02',
        },
        {
          id: 693134,
          name: 'Dune: Part Two',
          description: 'Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.',
          release_date: '2024-02-27',
        },
        {
          id: 1011985,
          name: 'Kung Fu Panda 4',
          description: 'Po is gearing up to become the spiritual leader of his Valley of Peace, but also needs someone to take his place as Dragon Warrior. As such, he will train a new kung fu practitioner for the spot and will encounter a villain called the Chameleon who conjures villains from the past.',
          release_date: '2024-03-02',
        },
        {
          id: 967847,
          name: 'Ghostbusters: Frozen Empire',
          description: 'After the original team developed a top-secret research laboratory to take the shattered ghosts to the next level. But when the discovery of an ancient artifact unleashes an evil force, both new and old must join forces to protect their homeland and save the world from the Second Ice Age... from the very thing that unleashes an unstoppable force from the depths of history. As chaos reigns and pure evil plunges the world into darkness, the Ghostbusters must step forward once again to save humanity from the brink of doom. With two generations of Ghostbusters fighting side by side, the stakes have never been higher. Will they be able to avert the inevitable before everything freezes?',
          release_date: '2024-03-20',
        },
        {
          id: 1094844,
          name: 'Ape vs. Mecha Ape',
          description: 'Recognizing the destructive power of its captive giant Ape, the military makes its own battle-ready A.I., Mecha Ape. But its first practical test goes horribly wrong, leaving the military no choice but to release the imprisoned giant ape to stop the colossal robot before it destroys downtown Chicago.',
          release_date: '2023-03-24',
        },
        {
          id: 1111873,
          name: 'Abigail',
          description: 'A group of criminals kidnaps a teenage ballet dancer, the daughter of a notorious gang leader, in order to obtain a ransom of $50 million, but over time, they discover that she is not just an ordinary girl. After the kidnappers begin to diminish, one by one, they discover, to their increasing horror, that they are locked inside with an unusual girl.',
          release_date: '2024-04-18',
        },
        {
          id: 1096197,
          name: 'No Way Up',
          description: 'Characters from different backgrounds are thrown together when the plane they\'re travelling on crashes into the Pacific Ocean. A nightmare fight for survival ensues with the air supply running out and dangers creeping in from all sides.',
          release_date: '2024-01-18',
        },
        {
          id: 843527,
          name: 'The Idea of You',
          description: 'Solène, a 40-year-old single mom, begins an unexpected romance with 24-year-old Hayes Campbell, the lead singer of August Moon, the hottest boy band on the planet. When Solène must step in to chaperone her teenage daughter\'s trip to the Coachella Music Festival after her ex bails at the last minute, she has a chance encounter with Hayes and there is an instant, undeniable spark. As they begin a whirlwind romance, it isn\'t long before Hayes\' superstar status poses unavoidable challenges to their relationship, and Solène soon discovers that life in the glare of his spotlight might be more than she bargained for.',
          release_date: '2024-05-02',
        },
        {
          id: 748783,
          name: 'The Garfield Movie',
          description: 'Garfield, the world-famous, Monday-hating, lasagna-loving indoor cat, is about to have a wild outdoor adventure! After an unexpected reunion with his long-lost father – scruffy street cat Vic – Garfield and his canine friend Odie are forced from their perfectly pampered life into joining Vic in a hilarious, high-stakes heist.',
          release_date: '2024-04-30',
        },
        {
          id: 920342,
          name: 'Monster\'s Battlefield',
          description: 'The soldier king Qin Yang\'s fiancée Ye Qin met with an unknown beast and died tragically. Gu Ping invites him to participate in Ye Qin\'s scientific research before her death. But Gu Ping is using Ye Qin\'s research results to combine the genes of unknown beasts to create the \"Zero\" dragon creature. The intelligent dragon creature, coupled with the extra-terrestrial beast evolved by devouring,  an imminent city war is coming...',
          release_date: '2021-12-27',
        },
        {
          id: 119450,
          name: 'Dawn of the Planet of the Apes',
          description: 'A group of scientists in San Francisco struggle to stay alive in the aftermath of a plague that is wiping out humanity, while Caesar tries to maintain dominance over his community of intelligent apes.',
          release_date: '2014-07-08',
        },
        {
          id: 1064178,
          name: 'Hunt Club',
          description: 'Follows a group of male hunters who regularly lure women to their island with the chance to win 100K in a hunt, only to discover that they are the hunted, but this time they mess with the wrong girls and must deal with the consequences.',
          release_date: '2023-04-06',
        },
      ];

      const userRepository = getRepository(Movie);
        await userRepository.save(moviesData.map(moviesData => userRepository.create(moviesData)));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Limpar os dados da tabela de usuários, se necessário
        await queryRunner.query('DELETE FROM movies');
      }
}