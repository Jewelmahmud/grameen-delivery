class AppConstants {
  // App Identifiers
  static const String riderAppName = 'Grameen Delivery Rider';
  static const String merchantAppName = 'Grameen Delivery Merchant';

  // Currency
  static const String currencySymbol = '৳';
  static const String currencyCode = 'BDT';

  // API Endpoints (default local / staging)
  static const String defaultApiBaseUrl = 'http://10.0.2.2:3000/api'; // Android Emulator alias to localhost
  static const String defaultWsUrl = 'ws://10.0.2.2:3000/ws';

  // User Roles (matching backend PostgreSQL enum: customer, partner, rider, admin)
  static const String roleRider = 'rider';
  static const String rolePartner = 'partner'; // Merchant
  static const String roleAdmin = 'admin';
  static const String roleCustomer = 'customer';

  // Order & Delivery Statuses (matching backend migration)
  static const String statusPending = 'pending';
  static const String statusConfirmed = 'confirmed';
  static const String statusPreparing = 'preparing';
  static const String statusReady = 'ready';
  static const String statusAssigned = 'assigned';
  static const String statusPickedUp = 'picked_up';
  static const String statusInTransit = 'in_transit';
  static const String statusDelivered = 'delivered';
  static const String statusCancelled = 'cancelled';
  static const String statusFailed = 'failed';

  static String formatCurrency(double amount) {
    return '$currencySymbol${amount.toStringAsFixed(2)}';
  }

  static String getStatusLabel(String status, {bool isBangla = false}) {
    if (isBangla) {
      switch (status) {
        case statusPending:
          return 'অপেক্ষমাণ';
        case statusConfirmed:
          return 'নিশ্চিত হয়েছে';
        case statusPreparing:
          return 'প্রস্তুত হচ্ছে';
        case statusReady:
          return 'ডেলিভারির জন্য প্রস্তুত';
        case statusAssigned:
          return 'রাইডার নির্ধারিত';
        case statusPickedUp:
          return 'পিকআপ সম্পন্ন';
        case statusInTransit:
          return 'পথে রয়েছে';
        case statusDelivered:
          return 'ডেলিভারি সম্পন্ন';
        case statusCancelled:
          return 'বাতিল করা হয়েছে';
        default:
          return status;
      }
    } else {
      switch (status) {
        case statusPending:
          return 'Pending';
        case statusConfirmed:
          return 'Confirmed';
        case statusPreparing:
          return 'Preparing';
        case statusReady:
          return 'Ready for Pickup';
        case statusAssigned:
          return 'Assigned';
        case statusPickedUp:
          return 'Picked Up';
        case statusInTransit:
          return 'In Transit';
        case statusDelivered:
          return 'Delivered';
        case statusCancelled:
          return 'Cancelled';
        default:
          return status;
      }
    }
  }
}
