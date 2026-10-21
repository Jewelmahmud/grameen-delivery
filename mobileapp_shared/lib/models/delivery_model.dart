class DeliveryModel {
  final String id;
  final String deliveryNumber;
  final String orderId;
  final String? riderId;
  final String status; // 'pending', 'assigned', 'picked_up', 'in_transit', 'delivered', 'cancelled'
  final String merchantName;
  final String pickupAddress;
  final String deliveryAddress;
  final String recipientName;
  final String recipientPhone;
  final double codAmount;
  final double riderEarning;
  final double distanceKm;
  final DateTime createdAt;

  const DeliveryModel({
    required this.id,
    required this.deliveryNumber,
    required this.orderId,
    this.riderId,
    required this.status,
    required this.merchantName,
    required this.pickupAddress,
    required this.deliveryAddress,
    required this.recipientName,
    required this.recipientPhone,
    required this.codAmount,
    required this.riderEarning,
    required this.distanceKm,
    required this.createdAt,
  });

  factory DeliveryModel.fromJson(Map<String, dynamic> json) {
    return DeliveryModel(
      id: json['id'] as String? ?? '',
      deliveryNumber: json['delivery_number'] as String? ?? '',
      orderId: json['order_id'] as String? ?? '',
      riderId: json['rider_id'] as String?,
      status: json['status'] as String? ?? 'pending',
      merchantName: json['merchant_name'] as String? ?? 'Grameen Partner Store',
      pickupAddress: json['pickup_address'] as String? ?? '',
      deliveryAddress: json['delivery_address'] as String? ?? '',
      recipientName: json['recipient_name'] as String? ?? 'Recipient',
      recipientPhone: json['recipient_phone'] as String? ?? '',
      codAmount: (json['cod_amount'] as num?)?.toDouble() ?? (json['amount'] as num?)?.toDouble() ?? 0.0,
      riderEarning: (json['rider_earning'] as num?)?.toDouble() ?? 60.0,
      distanceKm: (json['distance_km'] as num?)?.toDouble() ?? 2.5,
      createdAt: json['created_at'] != null
          ? DateTime.tryParse(json['created_at'] as String) ?? DateTime.now()
          : DateTime.now(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'delivery_number': deliveryNumber,
      'order_id': orderId,
      'rider_id': riderId,
      'status': status,
      'merchant_name': merchantName,
      'pickup_address': pickupAddress,
      'delivery_address': deliveryAddress,
      'recipient_name': recipientName,
      'recipient_phone': recipientPhone,
      'cod_amount': codAmount,
      'rider_earning': riderEarning,
      'distance_km': distanceKm,
      'created_at': createdAt.toIso8601String(),
    };
  }
}
