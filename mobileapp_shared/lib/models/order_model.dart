class OrderItemModel {
  final String id;
  final String itemName;
  final int quantity;
  final double unitPrice;
  final double totalPrice;

  const OrderItemModel({
    required this.id,
    required this.itemName,
    required this.quantity,
    required this.unitPrice,
    required this.totalPrice,
  });

  factory OrderItemModel.fromJson(Map<String, dynamic> json) {
    return OrderItemModel(
      id: json['id'] as String? ?? '',
      itemName: json['item_name'] as String? ?? '',
      quantity: json['quantity'] as int? ?? 1,
      unitPrice: (json['unit_price'] as num?)?.toDouble() ?? 0.0,
      totalPrice: (json['total_price'] as num?)?.toDouble() ?? 0.0,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'item_name': itemName,
      'quantity': quantity,
      'unit_price': unitPrice,
      'total_price': totalPrice,
    };
  }
}

class OrderModel {
  final String id;
  final String orderNumber;
  final String partnerId;
  final String customerName;
  final String customerPhone;
  final String pickupAddress;
  final String deliveryAddress;
  final double totalAmount;
  final double deliveryFee;
  final String status;
  final String? specialInstructions;
  final DateTime createdAt;
  final List<OrderItemModel> items;

  const OrderModel({
    required this.id,
    required this.orderNumber,
    required this.partnerId,
    required this.customerName,
    required this.customerPhone,
    required this.pickupAddress,
    required this.deliveryAddress,
    required this.totalAmount,
    this.deliveryFee = 50.0,
    required this.status,
    this.specialInstructions,
    required this.createdAt,
    this.items = const [],
  });

  factory OrderModel.fromJson(Map<String, dynamic> json) {
    var rawItems = json['items'] as List<dynamic>? ?? [];
    return OrderModel(
      id: json['id'] as String? ?? '',
      orderNumber: json['order_number'] as String? ?? '',
      partnerId: json['partner_id'] as String? ?? '',
      customerName: json['customer_name'] as String? ?? 'Customer',
      customerPhone: json['customer_phone'] as String? ?? '',
      pickupAddress: json['pickup_address'] as String? ?? '',
      deliveryAddress: json['delivery_address'] as String? ?? '',
      totalAmount: (json['total_amount'] as num?)?.toDouble() ?? 0.0,
      deliveryFee: (json['delivery_fee'] as num?)?.toDouble() ?? 50.0,
      status: json['status'] as String? ?? 'pending',
      specialInstructions: json['special_instructions'] as String?,
      createdAt: json['created_at'] != null
          ? DateTime.tryParse(json['created_at'] as String) ?? DateTime.now()
          : DateTime.now(),
      items: rawItems.map((e) => OrderItemModel.fromJson(e as Map<String, dynamic>)).toList(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'order_number': orderNumber,
      'partner_id': partnerId,
      'customer_name': customerName,
      'customer_phone': customerPhone,
      'pickup_address': pickupAddress,
      'delivery_address': deliveryAddress,
      'total_amount': totalAmount,
      'delivery_fee': deliveryFee,
      'status': status,
      'special_instructions': specialInstructions,
      'created_at': createdAt.toIso8601String(),
      'items': items.map((i) => i.toJson()).toList(),
    };
  }
}
