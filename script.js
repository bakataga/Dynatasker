const taches = [];
console.log(taches);
function ajouterTache() {
  const tache = document.getElementById("nouvelleTache").value;
  const description = document.getElementById("description").value;
  const date = document.getElementById("date").value;
  const taskId = Date.now().toString();
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
  li.textContent = `TO DO :  ${nouvelleTache.nom}  WHAT : ${nouvelleTache.description}   AVANT : ${nouvelleTache.date}`;
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
  li.appendChild(boutonModifier);
  listeTaches.appendChild(li);
  li.appendChild(boutonSupprimer);

  // clear
  document.getElementById("nouvelleTache").value = "";
  document.getElementById("description").value = "";
}

function modifierTache(id) {
  const tache = document.querySelector(`li[data-id='${id}']`);
  if (tache) {
    const nouveauNom = prompt(
      "Modifier le nom:",
      tache.textContent.split("TO DO :")[1].split("WHAT :")[0].trim()
    );
    const nouvelleDescription = prompt(
      "Modifier la description:",
      tache.textContent.split("WHAT :")[1].split("AVANT :")[0].trim()
    );
    const nouvelleDate = prompt(
      "Modifier la date:",
      tache.textContent.split("AVANT :")[1].trim()
    );

    if (
      nouveauNom !== null &&
      nouvelleDescription !== null &&
      nouvelleDate !== null
    ) {
      tache.textContent = `TO DO : ${nouveauNom}  WHAT : ${nouvelleDescription}   AVANT : ${nouvelleDate}`;

      // Re-add the button to the li element
      const boutonModifier = document.createElement("button");
      boutonModifier.textContent = "Modifier";
      boutonModifier.addEventListener("click", () => {
        modifierTache(id);
      });
      tache.appendChild(boutonModifier);
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
