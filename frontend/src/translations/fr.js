export const frTranslations = {
  // Navbar
  nav: {
    home: 'Accueil',
    about: 'À Propos',
    services: 'Services',
    partner: 'Devenir Partenaire',
    trackOrder: 'Suivi de commande',
    help: 'Aide',
    login: 'Connexion',
    downloadApp: 'Télécharger l\'App'
  },
  
  // Auth Pages
  auth: {
    login: {
      title: 'Se connecter à votre compte',
      subtitle: 'Bienvenue! Veuillez saisir vos informations',
      email: 'Email',
      password: 'Mot de passe',
      rememberMe: 'Se souvenir de moi',
      forgotPassword: 'Mot de passe oublié?',
      loginButton: 'Se connecter',
      loggingIn: 'Connexion en cours...',
      orContinueWith: 'Ou continuer avec',
      continueWithGoogle: 'Continuer avec Google',
      noAccount: 'Vous n\'avez pas de compte?',
      signUp: 'S\'inscrire',
      error: 'Veuillez remplir tous les champs',
      registerHere: 'S\'inscrire',
    },
    register: {
      title: 'Créer un compte',
      subtitle: 'Rejoignez le réseau Grameen Delivery',
      fullName: 'Nom complet',
      email: 'Email',
      phone: 'Numéro de téléphone',
      password: 'Mot de passe',
      confirmPassword: 'Confirmer le mot de passe',
      registerAs: 'S\'inscrire en tant que',
      customer: 'Client',
      rider: 'Livreur',
      partner: 'Partenaire',
      terms: 'J\'accepte les',
      termsLink: 'Conditions d\'utilisation',
      and: 'et la',
      privacyLink: 'Politique de confidentialité',
      createButton: 'Créer un compte',
      creating: 'Création du compte...',
      orContinueWith: 'Ou continuer avec',
      continueWithGoogle: 'Continuer avec Google',
      haveAccount: 'Vous avez déjà un compte?',
      login: 'Se connecter',
      loginHere: 'Se connecter ici',
      error: {
        allFields: 'Veuillez remplir tous les champs',
        passwordsMatch: 'Les mots de passe ne correspondent pas',
        passwordLength: 'Le mot de passe doit comporter au moins 6 caractères'
      }
    }
  },
  
  // Dashboard Translations
  dashboard: {
    // Common Dashboard Elements
    common: {
      welcome: 'Bienvenue',
      overview: 'Aperçu',
      notifications: 'Notifications',
      profile: 'Profil',
      settings: 'Paramètres',
      logout: 'Déconnexion',
      noData: 'Aucune donnée disponible',
      loading: 'Chargement...',
      save: 'Enregistrer',
      cancel: 'Annuler',
      edit: 'Modifier',
      delete: 'Supprimer',
      confirm: 'Confirmer',
      confirmDelete: 'Êtes-vous sûr de vouloir supprimer ceci?',
      yes: 'Oui',
      no: 'Non',
      search: 'Rechercher',
      filter: 'Filtrer',
      sort: 'Trier',
      date: 'Date',
      status: 'Statut',
      actions: 'Actions',
      viewAll: 'Voir tout',
      backToDashboard: 'Retour au tableau de bord',
      today: 'Aujourd\'hui',
      thisWeek: 'Cette semaine',
      thisMonth: 'Ce mois-ci',
      lastMonth: 'Le mois dernier',
      all: 'Tous'
    },

    // Rider Dashboard
    rider: {
      title: 'Tableau de bord du livreur',
      earnings: 'Gains',
      totalEarnings: 'Gains totaux',
      weeklyEarnings: 'Gains hebdomadaires',
      deliveries: 'Livraisons',
      totalDeliveries: 'Livraisons totales',
      completedDeliveries: 'Livraisons terminées',
      pendingDeliveries: 'Livraisons en attente',
      upcomingDeliveries: 'Livraisons à venir',
      orderHistory: 'Historique des commandes',
      activeOrders: 'Commandes actives',
      availability: 'Disponibilité',
      goOnline: 'Se mettre en ligne',
      goOffline: 'Se mettre hors ligne',
      schedule: 'Planning',
      stats: 'Statistiques',
      ratings: 'Évaluations',
      performance: 'Performance',
      orderStatus: {
        new: 'Nouvelle',
        accepted: 'Acceptée',
        pickedUp: 'Récupérée',
        inTransit: 'En transit',
        delivered: 'Livrée',
        cancelled: 'Annulée'
      },
      orderDetails: 'Détails de la commande',
      customerInfo: 'Info client',
      pickupLocation: 'Lieu de ramassage',
      deliveryLocation: 'Lieu de livraison',
      acceptOrder: 'Accepter la commande',
      rejectOrder: 'Refuser la commande',
      startDelivery: 'Commencer la livraison',
      completeDelivery: 'Terminer la livraison',
      navigationMap: 'Carte de navigation',
      contactCustomer: 'Contacter le client',
      contactSupport: 'Contacter le support'
    },

    // Partner Dashboard
    partner: {
      title: 'Tableau de bord du partenaire',
      business: 'Entreprise',
      businessDetails: 'Détails de l\'entreprise',
      businessName: 'Nom de l\'entreprise',
      businessType: 'Type d\'entreprise',
      businessAddress: 'Adresse de l\'entreprise',
      contactPerson: 'Personne à contacter',
      orders: 'Commandes',
      newOrders: 'Nouvelles commandes',
      pendingOrders: 'Commandes en attente',
      processedOrders: 'Commandes traitées',
      orderHistory: 'Historique des commandes',
      products: 'Produits',
      addProduct: 'Ajouter un produit',
      manageProducts: 'Gérer les produits',
      categories: 'Catégories',
      inventory: 'Inventaire',
      lowStockAlert: 'Alerte de stock bas',
      sales: 'Ventes',
      revenue: 'Revenus',
      dailySales: 'Ventes quotidiennes',
      monthlySales: 'Ventes mensuelles',
      payouts: 'Paiements',
      pendingPayouts: 'Paiements en attente',
      completedPayouts: 'Paiements terminés',
      productDetails: {
        name: 'Nom',
        description: 'Description',
        price: 'Prix',
        category: 'Catégorie',
        quantity: 'Quantité',
        images: 'Images',
        active: 'Actif',
        inactive: 'Inactif'
      },
      settings: {
        storeHours: 'Heures d\'ouverture',
        deliveryOptions: 'Options de livraison',
        payment: 'Paiement',
        notifications: 'Notifications'
      }
    },

    // Admin Dashboard
    admin: {
      title: 'Tableau de bord administrateur',
      users: 'Utilisateurs',
      allUsers: 'Tous les utilisateurs',
      customers: 'Clients',
      riders: 'Livreurs',
      partners: 'Partenaires',
      admins: 'Administrateurs',
      userManagement: 'Gestion des utilisateurs',
      addUser: 'Ajouter un utilisateur',
      editUser: 'Modifier un utilisateur',
      orders: 'Commandes',
      orderMetrics: 'Métriques des commandes',
      orderVolume: 'Volume des commandes',
      averageOrderValue: 'Valeur moyenne des commandes',
      deliveryTime: 'Temps de livraison',
      regions: 'Régions',
      addRegion: 'Ajouter une région',
      manageRegions: 'Gérer les régions',
      coverage: 'Couverture',
      analytics: 'Analytiques',
      revenueAnalytics: 'Analytiques des revenus',
      userAnalytics: 'Analytiques des utilisateurs',
      orderAnalytics: 'Analytiques des commandes',
      reports: 'Rapports',
      dailyReports: 'Rapports quotidiens',
      weeklyReports: 'Rapports hebdomadaires',
      monthlyReports: 'Rapports mensuels',
      customReports: 'Rapports personnalisés',
      settings: {
        system: 'Paramètres système',
        app: 'Paramètres de l\'application',
        fees: 'Paramètres des frais',
        payments: 'Paramètres de paiement',
        notifications: 'Paramètres de notification',
        language: 'Paramètres de langue',
        security: 'Paramètres de sécurité'
      },
      support: {
        tickets: 'Tickets de support',
        openTickets: 'Tickets ouverts',
        resolvedTickets: 'Tickets résolus',
        contactSupport: 'Contacter le support'
      }
    }
  },
  
  // Hero Section
  hero: {
    title: 'Grameen Delivery',
    subtitle: 'Révolutionner la livraison de produits en milieu rural',
    description: 'Besoin de livrer des produits dans les zones rurales? Grameen Delivery est ce qu\'il vous faut!',
    downloadBtn: 'Télécharger l\'App',
    earnBtn: 'Livrer & Gagner'
  },
  
  // What Can You Send Section
  sendSection: {
    title: 'Que pouvez-vous envoyer?',
    items: {
      agriculture: 'Produits Agricoles',
      documents: 'Documents',
      gifts: 'Cadeaux',
      tools: 'Outils & Équipements',
      medicines: 'Médicaments',
      market: 'Marché',
      gasCylinder: 'Gaz'
    }
  },
  
  // How It Works Section
  howItWorks: {
    title: 'Comment ça fonctionne',
    steps: {
      step1: {
        title: 'Téléchargez l\'App',
        description: 'Plateforme #1 pour les services de livraison rurale'
      },
      step2: {
        title: 'Sélectionnez l\'option de livraison et l\'emplacement',
        description: 'Ouvrez l\'App et sélectionnez les options de livraison. Définissez vos lieux de ramassage et de destination.'
      },
      step3: {
        title: 'Remplissez les informations',
        description: 'Remplissez les informations du destinataire et le type de produit livré, puis attendez que votre colis soit récupéré!'
      }
    }
  },
  
  // Features Section
  features: {
    ruralReach: {
      title: 'Portée Rurale',
      description: 'Nous livrons dans les villages les plus reculés où d\'autres services de livraison n\'arrivent pas. Connectez les communautés rurales avec des produits essentiels!'
    },
    trust: {
      title: 'Faites-nous confiance',
      description: 'Vous pouvez nous faire confiance pour livrer vos produits en toute sécurité et à temps dans les zones rurales. Nos partenaires de livraison locaux connaissent bien le terrain et les communautés.'
    },
    emergency: {
      title: 'Livraisons d\'urgence en zone rurale',
      description: 'Avec Grameen Delivery, vous pouvez obtenir rapidement des articles d\'urgence comme des médicaments et des fournitures essentielles dans les zones rurales.'
    }
  },
  
  // Coverage Section
  coverage: {
    title: 'Actuellement disponible dans les zones rurales de',
    description: 'Nous sommes actuellement disponibles dans certaines zones rurales et villages sélectionnés. Nous élargissons constamment notre présence à d\'autres endroits!'
  },
  
  // Deliver & Earn Section
  earn: {
    title: 'Livrer & Gagner',
    benefits: {
      flexible: 'Travaillez quand vous voulez',
      income: 'Gagnez un revenu supplémentaire en livrant dans les zones rurales',
      help: 'Aidez à connecter les communautés rurales avec des produits essentiels'
    },
    button: 'Commencez à gagner maintenant'
  },
  
  // FAQ Section
  faq: {
    title: 'Questions Fréquemment Posées',
    tabs: {
      customer: 'Je suis un client',
      partner: 'Je suis un partenaire de livraison'
    },
    questions: {
      contact: {
        question: 'Comment contacter le livreur?',
        answer: 'Après avoir accepté votre demande, vous verrez le nom, la photo et l\'évaluation du livreur apparaître sur l\'écran de votre téléphone, avec une icône de téléphone. Appuyez sur l\'icône du téléphone à côté du numéro de contact pour appeler le livreur.'
      },
      request: {
        question: 'Comment demander une livraison dans une zone rurale?',
        answer: 'Pour demander une livraison, sélectionnez Grameen Delivery sur l\'écran principal. Ensuite, sélectionnez votre lieu de ramassage et de livraison, remplissez les informations détaillées sur le destinataire et le type de produit. Notre système trouvera le partenaire de livraison le plus proche pour vous aider.'
      },
      payment: {
        question: 'Comment savoir combien payer?',
        answer: 'Après avoir choisi votre lieu de ramassage, de livraison, les informations du destinataire et la catégorie de produit, l\'écran de votre téléphone affichera la distance estimée parcourue et le tarif total correspondant à payer.'
      }
    }
  },
  
  // Footer
  footer: {
    platform: {
      title: 'Plateforme',
      items: {
        app: 'Grameen Delivery App',
        merchant: 'Grameen Marchand',
        partner: 'Grameen Partenaire'
      }
    },
    earn: {
      title: 'Gagner',
      items: {
        partner: 'Gagner en tant que partenaire de livraison',
        hub: 'Gagner en tant que hub villageois'
      }
    },
    help: {
      title: 'Aide',
      items: {
        centers: 'Centres de Support',
        userHelp: 'Aide Utilisateur',
        partnerHelp: 'Aide Partenaire de Livraison',
        helpline: 'Ligne d\'aide: 123-456-7890'
      }
    },
    copyright: '© 2025 Grameen Delivery. Tous droits réservés.'
  },

  // Order Tracking
  tracking: {
    title: 'Suivre Votre Commande',
    subtitle: 'Entrez votre numéro de suivi pour obtenir des mises à jour en temps réel sur votre livraison',
    inputPlaceholder: 'Entrez votre numéro de suivi (ex: DEMO123)',
    trackingButton: {
      default: 'Suivre la Commande',
      loading: 'Recherche...'
    },
    orderId: 'Numéro de Commande',
    trackingId: 'Numéro de Suivi',
    orderDate: 'Date de Commande',
    estimatedDelivery: 'Livraison Estimée',
    status: {
      label: 'Statut',
      placed: 'Commandé',
      picked: 'Récupéré',
      transit: 'En Transit',
      delivered: 'Livré',
      cancelled: 'Annulé'
    },
    deliveryProgress: 'Progression de la Livraison',
    deliveryDetails: 'Détails de la Livraison',
    deliveryPartner: 'Partenaire de Livraison',
    deliveryPerson: 'Livreur',
    contact: 'Contact',
    currentLocationLabel: 'Emplacement Actuel',
    currentLocation: 'En route vers l\'adresse de livraison',
    orderSummary: 'Résumé de la Commande',
    total: 'Total',
    timeline: {
      orderPlaced: 'Commande Passée',
      preparing: 'En Préparation',
      outForDelivery: 'En Cours de Livraison'
    },
    timelineDesc: {
      orderPlaced: 'Votre commande a été reçue et est en cours de traitement',
      preparing: 'Votre nourriture est en cours de préparation par nos chefs',
      outForDelivery: 'Votre commande est en route avec notre partenaire de livraison'
    },
    howToTrack: 'Comment Suivre Votre Commande',
    howToTrackSteps: {
      step1: 'Entrez le numéro de suivi qui vous a été envoyé par email',
      step2: 'Vous pouvez trouver votre numéro de suivi dans l\'email de confirmation de commande',
      step3: 'Essayez d\'utiliser "DEMO123" pour voir un exemple de résultat de suivi',
      step4: 'Pour tout problème, veuillez contacter notre service client au 555-123-4567'
    },
    errors: {
      emptyTrackingId: 'Veuillez entrer un numéro de suivi',
      noOrderFound: 'Aucune commande trouvée avec le numéro de suivi fourni. Essayez d\'utiliser DEMO123 pour une démo.'
    }
  },

  // About Page
  about: {
    pageTitle: 'À propos de Grameen Delivery',
    tagline: 'Connecter les zones rurales du Bangladesh avec des services de livraison fiables.',
    banner: {
      breadcrumb: 'Accueil / À propos',
      description: 'Découvrez notre mission, notre histoire et notre impact dans les zones rurales du Bangladesh. Nous connectons les communautés grâce à des services de livraison fiables.'
    },
    sections: {
      mission: {
        title: 'Notre Mission',
        content: 'Chez Grameen Delivery, notre mission est de combler le fossé entre les communautés rurales et les marchés urbains en fournissant des services de livraison fiables, abordables et efficaces. Nous croyons que l\'accès aux biens et services ne devrait pas être limité par la situation géographique.'
      },
      story: {
        title: 'Notre Histoire',
        paragraph1: 'Fondée en 2023, Grameen Delivery est née d\'une simple observation : les zones rurales du Bangladesh faisaient face à des défis importants pour accéder aux biens et services que les résidents urbains tenaient pour acquis. Voyant la croissance rapide du commerce électronique dans les villes, notre fondateur s\'est demandé pourquoi la même commodité ne pourrait pas être étendue aux villages et aux petites villes.',
        paragraph2: 'Commençant avec seulement trois livreurs dans le district de Natore, nous nous sommes maintenant étendus à plus de 25 districts, avec des centaines de partenaires de livraison servant des milliers de clients chaque jour. Notre croissance témoigne du besoin de nos services et de la confiance que nos clients nous accordent.'
      },
      howWeWork: {
        title: 'Comment Nous Travaillons',
        cards: {
          businesses: {
            icon: '🏪',
            title: 'Entreprises Partenaires',
            content: 'Nous nous associons avec des entreprises locales qui souhaitent élargir leur clientèle au-delà de leur zone immédiate. Grâce à notre plateforme, ces entreprises peuvent atteindre des clients dans des villages et villes éloignés.'
          },
          riders: {
            icon: '🛵',
            title: 'Livreurs',
            content: 'Notre réseau de livreurs formés est l\'épine dorsale de notre opération. Ils naviguent sur les routes rurales difficiles pour assurer que les colis atteignent leurs destinations en toute sécurité et à temps.'
          },
          technology: {
            icon: '📱',
            title: 'Plateforme Technologique',
            content: 'Notre plateforme technologique sur mesure connecte clients, entreprises et livreurs de manière transparente, suit les commandes en temps réel et optimise les itinéraires de livraison pour plus d\'efficacité.'
          }
        }
      },
      impact: {
        title: 'Notre Impact',
        stats: {
          districts: {
            number: '25+',
            label: 'Districts Desservis'
          },
          partners: {
            number: '500+',
            label: 'Partenaires de Livraison'
          },
          businesses: {
            number: '150+',
            label: 'Partenaires Commerciaux'
          },
          deliveries: {
            number: '10 000+',
            label: 'Livraisons Quotidiennes'
          }
        }
      },
      contact: {
        title: 'Contactez-Nous',
        intro: 'Vous avez des questions ou souhaitez en savoir plus sur nos services ? Contactez-nous à :',
        email: 'info@grameendelivery.com',
        phone: '+880 1712-345678',
        address: '123 Rue Principale, Dhaka, Bangladesh'
      }
    }
  }
}; 