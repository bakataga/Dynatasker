const taches = [];
console.log(taches);

function ajouterTache() {
  const tache = document.getElementById("nouvelleTache").value;
  const description = document.getElementById("description").value;
  const date = document.getElementById("date").value;
  const taskId = Date.now().toString();

  if (!tache || !description || !date) {
    alert("Veuillez remplir tous les champs avant d'ajouter une tâche.");
    return;
  }

  // objet tache avec un ID unique

  const nouvelleTache = {
    id: taskId,
    nom: tache,
    description: description,
    date: date,
  };
  taches.push(nouvelleTache);
  console.log(taches);
  // ajouter tache a la liste
  const listeTaches = document.getElementById("listeTaches");
  const li = document.createElement("li");
  li.textContent = `  ${nouvelleTache.nom}   ${nouvelleTache.description}   ${nouvelleTache.date}`;
  li.classList.add("tache");
  li.dataset.id = nouvelleTache.id;

  const boutonModifier = document.createElement("button");
  boutonModifier.textContent = "Modifier";
  boutonModifier.addEventListener("click", () => {
    modifierTache(nouvelleTache.id);
  });

  const boutonSupprimer = document.createElement("button");
  boutonSupprimer.textContent = "Supprimer";
  boutonSupprimer.addEventListener("click", () => {
    supprimerTache(nouvelleTache.id);
  });
  const boutonTerminer = document.createElement("button");
  boutonTerminer.textContent = "Terminer";
  boutonTerminer.addEventListener("click", () => {
    marquerTermine(nouvelleTache.id);
  });
  li.appendChild(boutonModifier);

  li.appendChild(boutonSupprimer);
  li.appendChild(boutonTerminer);
  listeTaches.appendChild(li);

  // clear
  document.getElementById("nouvelleTache").value = "";
  document.getElementById("description").value = "";

  trierTachesParDate();
}

function modifierTache(id) {
  const tache = document.querySelector(`li[data-id='${id}']`);
  if (tache) {
    // Get current task values (without complex string manipulation)
    const valeursActuelles = tache.textContent.split(" ");

    // Prompt for new values with pre-filled defaults
    const nouveauNom = prompt(
      "Nouveau nom de la tâche :",
      "",
      valeursActuelles[0]
    );
    const nouvelleDescription = prompt(
      "Nouvelle description :",
      "",
      valeursActuelles[1]
    );
    const nouvelleDate = prompt("Nouvelle date :", "", valeursActuelles[2]);

    // Update content only if values were modified
    if (
      nouveauNom !== null ||
      nouvelleDescription !== null ||
      nouvelleDate !== null
    ) {
      tache.textContent = `${nouveauNom || valeursActuelles[0]} ${
        nouvelleDescription || valeursActuelles[1]
      } ${nouvelleDate || valeursActuelles[2]}`;

      // Clear existing buttons (optional, to avoid duplicates)
      tache.querySelectorAll("button").forEach((button) => button.remove());

      // Create and append new buttons (similar to initial creation)
      const boutonModifier = document.createElement("button");
      boutonModifier.textContent = "Modifier";
      boutonModifier.addEventListener("click", () => {
        modifierTache(tache.dataset.id); // Use dataset.id for the modified element
      });

      const boutonSupprimer = document.createElement("button");
      boutonSupprimer.textContent = "Supprimer";
      boutonSupprimer.addEventListener("click", () => {
        supprimerTache(tache.dataset.id); // Use dataset.id for the modified element
      });

      const boutonTerminer = document.createElement("button");
      boutonTerminer.textContent = "Terminer";
      boutonTerminer.addEventListener("click", () => {
        marquerTermine(tache.dataset.id); // Use dataset.id for the modified element
      });

      tache.appendChild(boutonModifier);
      tache.appendChild(boutonSupprimer);
      tache.appendChild(boutonTerminer);
    }
  } else {
    console.error("Tâche non trouvée");
  }
}
function supprimerTache(id) {
  const tache = document.querySelector(`li[data-id='${id}']`);
  if (tache) {
    tache.remove();

    const index = taches.findIndex((t) => t.id === id);
    if (index !== -1) {
      taches.splice(index, 1);
    }
  } else {
    console.error("Tâche non trouvée");
  }
}

function marquerTermine(id) {
  const tache = taches.find((t) => t.id === id);
  if (tache) {
    tache.termine = !tache.termine; // Inverse l'état de la tâche
    const li = document.querySelector(`li[data-id="${id}"]`);
    if (tache.termine) {
      li.classList.add("termine");
    } else {
      li.classList.remove("termine");
    }
  } else {
    console.error("Tâche non trouvée");
  }
}
function trierTachesParDate() {
  taches.sort((a, b) => new Date(a.date) - new Date(b.date));

  const listeTaches = document.getElementById("listeTaches");
  listeTaches.innerHTML = "";

  taches.forEach((tache) => {
    const li = document.createElement("li");
    li.textContent = ` ${tache.nom} ${tache.description} ${tache.date}`;
    li.classList.add("tache");
    li.dataset.id = tache.id;

    const boutonModifier = document.createElement("button");
    boutonModifier.textContent = "Modifier";
    boutonModifier.addEventListener("click", () => {
      modifierTache(tache.id);
    });

    const boutonSupprimer = document.createElement("button");
    boutonSupprimer.textContent = "Supprimer";
    boutonSupprimer.addEventListener("click", () => {
      supprimerTache(tache.id);
    });

    const boutonTerminer = document.createElement("button");
    boutonTerminer.textContent = "Terminer";
    boutonTerminer.addEventListener("click", () => {
      marquerTermine(tache.id);
    });

    li.appendChild(boutonModifier);
    li.appendChild(boutonSupprimer);
    li.appendChild(boutonTerminer);
    listeTaches.appendChild(li);
  });
}
