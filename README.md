<h1 align="center">
  <p>
    Application mobile de Gestion de données de télémétries dans le monde de la construction
  </p>
</h1>

<p align="center">
  <strong>TFE EPHEC</strong><br>
  Projet du Centre de Recherche Scientifique et Technique de la construction Belge
</p>



Ce projet comporte un ensemble de tecnologies :

- **Application mobile.** React Native est le langage utilisé pour développer cette partie.
- **Hasura** Le rôle de ce service est d'offrir à l'app mobile une api pour des données en temps réel.
- **Thingsboard** Gestion et enregistrement des données reçus des capteurs Lorawan
- **Chirpstack** Gestion et communication avec les modules Lorawan
- **API CSTC** Afin de rendre compatible l'api de Thingsboard avec l'app, cette API sert d'intermédiaire pour effectuer les fonctions complexes requises.

## Table des matières

- [Installation](#-installation)
- [React Native](#-react-native)
- [Documentation](#-documentation)
- [Amélioration](#-amélioration)
- [Contribution](#-contribution)
- [Licence](#-licence)


## 📋 Installation

Commencez par cloner ce répertoire :

	git clone https://github.com/David-Aires/CSTC-APP.git

Ensuite, lancez le docker-compose pour l'installation automatique de toute la structure
	
	cd "infrastructure réseau"
	docker-compose up

Attention, no'oubliez pas de rajouter votre clé de licence pour Thingsboard PE dans le docker-compose

## 🎉 React Native

Version: 2.0.1
Environnement de développement : [EXPO][expo]

L'application utilise plusieurs libraires:

- [Apollo][hello-world]
- [React-Navigation][new-app]
- [VectorIcons][existing]

A noter qu'une APK est présente à la racine du projet.

[hello-world]: https://www.apollographql.com/docs/
[new-app]: https://reactnavigation.org/
[existing]: https://oblador.github.io/react-native-vector-icons/
[expo]: https://expo.io/

## 📖 Documentation

Cette rubrique reprend toutes les technologies et leur documentation.

- [Thingsboard][thingsboard]
- [React-Native][react-native]
- [Chirpstack][chirpstack]
- [Hasura][hasura]

[thingsboard]: https://thingsboard.io/docs/
[react-native]: https://reactnative.dev/docs/getting-started
[chirpstack]: https://www.chirpstack.io/project/
[hasura]: https://hasura.io/docs/1.0/graphql/manual/getting-started/index.html

## 🚀 Amélioration

Une nouvelle mise à jour de Thingsboard sera bientôt disponible. Celle-ci apporte une api comlplète pour développer une application mobile traitant les données et la gestion de Thingsboard.
Grâce à cela, il est envisagable de supprimer l'API CSTC et la librairie Apollo afin de n'utiliser plus que la plateforme Thingsboard.

## 👏 Contribution

Toute proposition est évidemment la bienvenue. De plus, ce projet restera entièrement open-source et disponible tout au long de son développement.


## 📄 Licence

Ce projet est entièrement open-source. 
De plus, afin d'éviter d'utiliser une version payante de Thingsboard, sachez qu'une version gratuite est disponible.
Ainsi ce projet reste réalisable pour n'importe qui!

