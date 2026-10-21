class UserModel {
  final String id;
  final String name;
  final String phone;
  final String email;
  final String role; // 'rider', 'partner', 'admin', 'customer'
  final String? storeName; // for partners
  final String? vehicleType; // for riders
  final String? vehicleNumber;
  final bool isOnline; // for riders
  final double rating;

  const UserModel({
    required this.id,
    required this.name,
    required this.phone,
    required this.email,
    required this.role,
    this.storeName,
    this.vehicleType,
    this.vehicleNumber,
    this.isOnline = false,
    this.rating = 5.0,
  });

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      id: json['id'] as String? ?? json['user_id'] as String? ?? '',
      name: json['name'] as String? ?? '',
      phone: json['phone'] as String? ?? '',
      email: json['email'] as String? ?? '',
      role: json['role'] as String? ?? 'customer',
      storeName: json['business_name'] as String? ?? json['store_name'] as String?,
      vehicleType: json['vehicle_type'] as String?,
      vehicleNumber: json['vehicle_number'] as String?,
      isOnline: json['online_status'] as bool? ?? false,
      rating: (json['rating'] as num?)?.toDouble() ?? 5.0,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'phone': phone,
      'email': email,
      'role': role,
      'business_name': storeName,
      'vehicle_type': vehicleType,
      'vehicle_number': vehicleNumber,
      'online_status': isOnline,
      'rating': rating,
    };
  }
}
