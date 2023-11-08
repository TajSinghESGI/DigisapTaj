Création d'une application mobile dans le cadre d'un test technique pour l'entreprise Digisap.

  

# Projet Digisap

## DEMO

![Demo](https://github.com/TajSinghESGI/DigisapTest/blob/main/demo.gif)
  

>**Note**: Suivre les instructions de configuration de la machine [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) avant de commencer.

  
## Etape 1: Installer les dépendances

Installer les dépendances nécessaires en exécutant les commandes : 

```bash
# avec npm
cd ./DigisapTest && npm install && cd ./ios && pod install

# avec yarn
cd ./DigisapTest && yarn install && cd ./ios && pod install
```  

## Etape 2: Démarrer le serveur

 
Lancer le serveur métro en exécutant les commandes :

```bash
# avec npm
npm  start

# avec Yarn
yarn  start
```

  
## Etape 3: Exécuter l'application

  

Lancer un émulateur Android ou iOS avant d'exécuter les commandes pour lancer le projet.  Vous pouvez aussi exécuter l'application sur un téléphone physique, les commandes restent les mêmes. 
  

### Pour Android

Si vous exécuter l'application sur android, il faudra changer le chemin d'accès à votre sdk android local. Pour ce faire, se render dans `./DigisapTest/android/local.properties` et modifier le chemin en fonction de votre installation du sdk android. ([Voir ici si besoin d'aide).](https://medium.com/@deepbag/react-native-issues-solution-sdk-location-not-found-96b976b32022)

Enfin pour lancer le projet, exécuter la commande : 

```bash
# avec npm
npm  run  android

# avec Yarn
yarn  android
```


### Pour iOS

```bash
# avec npm
npm  run  ios

# avec Yarn
yarn  ios
```

L'application devrait se lancer après quelques minutes. 

