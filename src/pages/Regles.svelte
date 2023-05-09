<script lang="ts">
  import MiniCard from "../lib/MiniCard.svelte";
</script>

<svelte:head>
  <title>Regles</title>
</svelte:head>

<div class="has-text-centered mt-3">
  <h1 class="title is-1">Règles</h1>
</div>
<div class="mx-5 mt-6">
  <h5 class="subtitle is-4">Déroulement d'une partie</h5>
  <p>
    Le jeu se déroule en plusieurs manches. Lorsqu'un joueur atteint un score
    supérieur ou égal à 120, la partie se conclut. Le joueur ayant le score
    minimum à la fin, obtient "la 1re place".
  </p>
  <p>
    Le reste sera classé par ordre croissant. Le décompte des points de chacun
    se fait à la fin de chaque manche et s'additionne pour donner le score final
    à la fin du nombre de manches décidé pour la partie.
  </p>
  <p>
    Le but du jeu est d'avoir le moins de points possibles a la fin de la
    partie.
  </p>
</div>
<div class="mx-5 mt-6">
  <h5 class="subtitle is-4">Déroulement d'une manche</h5>
  <p>
    Un joueur mélange les cartes à distribuer et en donne quatre à chaques
    joueur.
  </p>
  <p>
    Il pose la pioche au centre, face cachée. Chaque joueur dispose ses 4 cartes
    devant lui en carré. Chaque joueur doit prendre connaissance uniquement des
    deux premières cartes devant lui et doit les retenir avant de les reposer
    face cachée au même endroit, avant que le jeu ne commence.
  </p>
  <p>
    Les cartes ne peuvent pas être interchangées de places! sauf avec le pouvoir
    des cartes.
  </p>
  <p>
    Le joueur situé à la droite (ou gauche, à définir en début de partie) du
    donneur commence le tour.
  </p>
  <p>
    Il pioche une carte dans la pioche OU que lui seul regarde et peut, selon
    son choix :
  </p>
  <div class="content">
    <ul>
      <li>
        La reposer dans la défausse (située à côté de la pioche, face visible)
        en utilisant, ou pas, le pouvoir de cette carte le cas échéant (voir
        partie : pouvoir des cartes) (A).
      </li>
      <li>
        La placer dans son jeu face cachée à la place de n'importe quelle autre
        de ses 4 cartes et défausse ensuite la carte ainsi remplacée (face
        visible comme toujours dans une défausse) (B).
      </li>
    </ul>
  </div>
  <p>Le joueur suivant a le choix :</p>
  <div class="content">
    <ul>
      <li>
        Soit de prendre la dernière carte de la défausse pour l'intégrer à son
        jeu (voir B).
      </li>
      <li>
        Soit de piocher une carte et effectuer une des actions précédentes (A ou
        B).
      </li>
    </ul>
  </div>
</div>
<div class="mx-5 mt-6">
  <h5 class="subtitle is-4">Défausse rapide</h5>
  <p>
    Lorsqu'un joueur défausse une de ses cartes au cours de son tour, n'importe
    lequel des autres joueurs peut poser sur cette défausse une carte de même
    valeur, issue des cartes disposées devant lui.
  </p>
  <p>Un joueur peut défausser une carte même après l'annoncement d'un Gabo.</p>
</div>
<div class="mx-5 mt-6">
  <h5 class="subtitle is-4">Fin d'une manche</h5>
  <p>
    Au fur et à mesure des tours, les joueurs doivent abaisser la valeur de leur
    main (cartes disposées face cachées devant eux) en les remplaçant par des
    cartes piochées, en les jetant dans la défausse le cas échéant, ou en
    échangeant ses cartes avec celles de ses adversaires en cas de pouvoir.
  </p>
  <p>
    Le joueur ajoutant la valeur de ses cartes et obtenant un résultat inférieur
    ou égal à 7 points annonce ensuite le "Gabo" A ce moment la, l'ensemble des
    joueurs dévoile ses cartes.
  </p>
  <p>
    Le vaiqueur récolte 0 points, tandis que le reste additione le poid de
    chaque carte qu'il a en sa possession. Plusieurs joueurs peuvent annoncer
    Gabo même après la première annonce, on se retrouve dans une situation ou
    plusiuers joueurs peuvent récolter 0 points en une manche.
  </p>
  <p>
    NB: Si un joueur se défausse de toutes ses cartes, la manche se termine
    automatiquement et personne ne peut annoncer "Gabo". Dans le cas ou le
    joueur annonce le gabo, et avant la révélation des cartes un joueur se
    défausse de toutes ses cartes. Le gabo est annulé , la manche se termine
    aussi.
  </p>
</div>
<div class="mx-5 mt-6">
  <h5 class="subtitle is-4">Poids des cartes</h5>
  <div class="cards">
    <MiniCard icon={"A"} pts={"1"} />
    <MiniCard icon={"2"} pts={"2"} />
    <MiniCard icon={"3"} pts={"3"} />
    <MiniCard icon={"4"} pts={"4"} />
    <MiniCard icon={"5"} pts={"5"} />
    <MiniCard icon={"6"} pts={"6"} />
    <MiniCard icon={"7"} pts={"7"} />
    <MiniCard icon={"8"} pts={"8"} />
    <MiniCard icon={"9"} pts={"9"} />
    <MiniCard icon={"10"} pts={"10"} />
    <MiniCard icon={"V"} pts={"11"} />
    <MiniCard icon={"D"} pts={"12"} />
    <MiniCard icon={"R"} pts={"13"} />
    <MiniCard icon={"R"} pts={"0"} red={true} />
  </div>
</div>
<div class="mx-5 mt-6">
  <h5 class="subtitle is-4">Pouvoirs des cartes</h5>
  <p>
    Lorsqu'une des cartes citées ci-dessous est piochée puis défaussée par un
    joueur, il peut, s'il le souhaite, exercer le pouvoir conféré à cette carte.
  </p>
  <div class="powers">
    <MiniCard
      icon={"7"}
      icon2={"8"}
      text={"Possibilité de regarder une de ses propres cartes, puis de la reposer toujours face cachée au même endroit"}
    />
    <MiniCard
      icon={"9"}
      icon2={"10"}
      text={"Possibilité de regarder une des cartes d'un adversaire, puis de la reposer toujours face cachée au même endroit."}
    />
    <MiniCard
      icon={"V"}
      text={"Possibilité d'échanger à l'aveugle une de ses cartes avec celle d'un adversaire. Interdiction pour les joueurs de regarder les cartes ainsi échangées (possibilité ultérieure à l'aide du pouvoir des cartes 7 et 8). Aucun Gabo ne peut être annoncé avant que le joueur n'ait effectué son choix."}
    />
    <MiniCard
      icon={"D"}
      text={"Possibilité de regarder la carte d'un adversaire et possibilité de l'échanger avec l'une de ses cartes. Aucun Gabo ne peut être annoncé avant que le joueur n'ait effectué son choix."}
    />
  </div>
</div>
<div class="mx-5 mt-6">
  <h5 class="subtitle is-4">Pénalité</h5>
  <div class="content">
    <ul>
      <li>
        Si un joueur regarde une de ses cartes qu'il a oublié ou qu'il se
        défausse d'une carte qui se retrouve ne pas être la bonne, il est
        pénalisé en prenant la première carte de la pioche sans la regarder et
        en la disposant face cachée devant lui, se rajoutant ainsi une nouvelle
        carte inconnue à gérer.
      </li>
      <li>
        Pénalité A: Si un joueur annonce "Gabo", hors il se retrouve avec un score supérieur
        à 7. Lors du décompte des points, il auras une pénalité de +25 points.
      </li>
      <li>
        Pénalité B:
        Si un joueur se retrouve victime d'un "Contre-Gabo" (voir la section
        Contre-Gabo). Lors du décompte des points, il auras une pénalité de +50
        points.
      </li>
      <li>
        Pénalité C: Un Gabo est annoncé, Le scenario de la pénalité A devrait
        être appliqué mais au moment ou elle se passe, mais 2 autres joueurs
        (pour n'importe quelle parti a "n" joueurs) ont plus ou égal 25 points
        de carte. La pénalité C s'applique, les joueurs ayant plus ou égal de 25
        en points, prenne la pénalité A. La personne ayant annoncé le gabo:
        prend la pénalité A ~et~ la somme des points de ses cartes.
      </li>
    </ul>
  </div>
  <p>
    NB: Si un joueur prends la pénalité (A) il est dans l'impossibilité de
    prendre la pénalité (B) pendant la même manche.
  </p>
</div>
<div class="mx-5 mt-6">
  <h5 class="subtitle is-4">Contre-Gabo - Bataille</h5>

  <p>
    Lorsqu'un joueur annonce Gabo, on passe alors en phase de "Contre-Gabo".
  </p>
  <p>
    Si un joueur pense contesté le Gabo de son adversaire il peut annoncer un
    "Contre-Gabo" et tout les autres joueurs ayant annoncé Gabo se retrouvent
    dans *La Bataille* Le joueur ayant annoncé le premier Gabo peut aussi
    annoncer le Contre-Gabo en réaction au Gabo d'un autre joueur.
  </p>
  <p>
    Tout autres joueurs annonçant un Gabo après l'annonce du Contre-Gabo se
    retrouve dans la *Battaille* et se doit de comparer ses cartes avec les
    autres joueurs aussi.
  </p>
  <p>
    Le(s) joueur(s) ayant le plus de point parmis les joueurs dans la *Bataille*
    se récolte une pénalité de +50 points.
  </p>
</div>
<div class="mx-5 mt-6">
  <h5 class="subtitle is-4">Redescente</h5>

  <p>Lorsqu'un joueur atteint le score de 50, son score retombe a 25.</p>
  <p>Lorsqu'un joueur atteint le score de 100, son score retombe a 50.</p>
  <p>
    Un joueur ne peut pas redescendre la même manche ou il subit une pénalité
    (A) ou (B)
  </p>
</div>

<style>
  p,
  .content {
    margin-bottom: 1rem;
  }
  li {
    color: hsl(0deg, 0%, 29%);
  }
  .cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 1rem;
  }
  .powers {
    display: flex;
    flex-direction: column;
  }
</style>
