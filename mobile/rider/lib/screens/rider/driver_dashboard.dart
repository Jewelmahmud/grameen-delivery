import 'package:flutter/material.dart';
import '../../theme/app_theme.dart';
import '../../widgets/custom_button.dart';
import '../../widgets/rider_app_bar.dart';
import '../../l10n/app_localizations.dart';

class DriverDashboard extends StatefulWidget {
  const DriverDashboard({super.key});

  @override
  State<DriverDashboard> createState() => _DriverDashboardState();
}

class _DriverDashboardState extends State<DriverDashboard> {
  int _currentIndex = 0;
  bool _isOnline = true;

  final List<Widget> _screens = [
    const OverviewTab(),
    const DeliveriesTab(),
    const EarningsTab(),
    const ProfileTab(),
  ];

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context)!;
    return Scaffold(
      body: _screens[_currentIndex],
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (index) {
          setState(() {
            _currentIndex = index;
          });
        },
        type: BottomNavigationBarType.fixed,
        selectedItemColor: AppTheme.primaryColor,
        unselectedItemColor: AppTheme.textSecondary,
        items: [
          BottomNavigationBarItem(
            icon: const Icon(Icons.dashboard),
            label: loc.riderOverview,
          ),
          BottomNavigationBarItem(
            icon: const Icon(Icons.local_shipping),
            label: loc.riderDeliveries,
          ),
          BottomNavigationBarItem(
            icon: const Icon(Icons.attach_money),
            label: loc.riderEarnings,
          ),
          BottomNavigationBarItem(
            icon: const Icon(Icons.person),
            label: loc.riderProfile,
          ),
        ],
      ),
    );
  }
}

class OverviewTab extends StatefulWidget {
  const OverviewTab({super.key});

  @override
  State<OverviewTab> createState() => _OverviewTabState();
}

class _OverviewTabState extends State<OverviewTab> {
  bool _isOnline = true;
  Map<String, dynamic>? _currentDelivery;
  final List<Map<String, dynamic>> _availableOrders = [
    {
      'id': 'ORD-001',
      'restaurantName': 'পিজা প্যালেস',
      'customerAddress': '১২৩ মেইন স্ট্রিট, ডাউনটাউন',
      'distance': '২.৩ কিমি',
      'estimatedTime': '১৫ মিনিট',
      'earnings': '৳৮.৫০',
    },
    {
      'id': 'ORD-002',
      'restaurantName': 'বার্গার হাউস',
      'customerAddress': '৪৫৬ ওক এভিনিউ, মিডটাউন',
      'distance': '১.৮ কিমি',
      'estimatedTime': '১২ মিনিট',
      'earnings': '৳৭.২০',
    },
  ];

  @override
  void initState() {
    super.initState();
    // Set a current delivery for demo
    _currentDelivery = {
      'id': 'DLV-001',
      'customerName': 'আহমেদ হোসেন',
      'deliveryAddress': '৭৮৯ পার্ক রোড, উত্তর সিটি',
      'amount': '৳১৫.০০',
      'status': 'In Progress',
    };
  }

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context)!;
    final isBangla = Localizations.localeOf(context).languageCode == 'bn';

    return Scaffold(
      appBar: RiderAppBar(
        title: loc.riderDashboardTitle,
        isOnline: _isOnline,
        onOnlineStatusChanged: (value) {
          setState(() {
            _isOnline = value;
          });
        },
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(AppTheme.spacingLg),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Status Card
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(AppTheme.spacingLg),
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: _isOnline
                      ? [AppTheme.statusSuccess, AppTheme.primaryDark]
                      : [
                          AppTheme.statusError,
                          AppTheme.statusError.withOpacity(0.7),
                        ],
                ),
                borderRadius: BorderRadius.circular(AppTheme.borderRadius),
              ),
              child: Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        _isOnline ? loc.riderOnline : loc.riderOffline,
                        style: const TextStyle(
                          color: AppTheme.textLight,
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      Icon(Icons.circle, color: AppTheme.textLight, size: 16),
                    ],
                  ),
                  const SizedBox(height: AppTheme.spacingMd),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            loc.riderTodayDeliveries,
                            style: const TextStyle(
                              color: AppTheme.textLight,
                              fontSize: 14,
                            ),
                          ),
                          const Text(
                            '8',
                            style: TextStyle(
                              color: AppTheme.textLight,
                              fontSize: 24,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ],
                      ),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.end,
                        children: [
                          Text(
                            loc.riderEarnings,
                            style: const TextStyle(
                              color: AppTheme.textLight,
                              fontSize: 14,
                            ),
                          ),
                          const Text(
                            '৳৪৫.২০',
                            style: TextStyle(
                              color: AppTheme.textLight,
                              fontSize: 24,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: AppTheme.spacingLg),
            // Quick Actions
            Text(
              loc.riderQuickActions,
              style: const TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
                color: AppTheme.textPrimary,
              ),
            ),
            const SizedBox(height: AppTheme.spacingMd),
            Row(
              children: [
                Expanded(
                  child: _buildQuickActionCard(
                    icon: Icons.map,
                    title: loc.riderViewMap,
                    onTap: () {
                      // TODO: View map
                    },
                  ),
                ),
                const SizedBox(width: AppTheme.spacingMd),
                Expanded(
                  child: _buildQuickActionCard(
                    icon: Icons.support_agent,
                    title: loc.riderSupport,
                    onTap: () {
                      // TODO: Support
                    },
                  ),
                ),
              ],
            ),
            const SizedBox(height: AppTheme.spacingLg),
            // Current Delivery
            Text(
              loc.riderCurrentDelivery,
              style: const TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
                color: AppTheme.textPrimary,
              ),
            ),
            const SizedBox(height: AppTheme.spacingMd),
            if (_currentDelivery == null)
              Center(
                child: Text(
                  loc.riderNoCurrentDelivery,
                  style: const TextStyle(
                    color: AppTheme.textSecondary,
                    fontSize: 16,
                  ),
                ),
              )
            else
              _buildCurrentDeliveryCard(_currentDelivery!),
            const SizedBox(height: AppTheme.spacingLg),
            // Available Orders
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  loc.riderAvailableOrders,
                  style: const TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                    color: AppTheme.textPrimary,
                  ),
                ),
                TextButton(
                  onPressed: () {
                    // TODO: View all orders
                  },
                  child: Text(loc.riderViewAll),
                ),
              ],
            ),
            const SizedBox(height: AppTheme.spacingMd),
            if (_availableOrders.isEmpty)
              Center(
                child: Text(
                  loc.riderNoAvailableOrders,
                  style: const TextStyle(
                    color: AppTheme.textSecondary,
                    fontSize: 16,
                  ),
                ),
              )
            else
              ..._availableOrders.map(
                (order) => _buildAvailableOrderCard(order),
              ),
          ],
        ),
      ),
    );
  }

  Widget _buildQuickActionCard({
    required IconData icon,
    required String title,
    required VoidCallback onTap,
  }) {
    final isBangla = Localizations.localeOf(context).languageCode == 'bn';

    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(AppTheme.spacingMd),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(AppTheme.borderRadius),
          border: Border.all(color: AppTheme.borderColor),
        ),
        child: Column(
          children: [
            Icon(icon, color: AppTheme.primaryColor, size: 32),
            const SizedBox(height: AppTheme.spacingSm),
            Text(
              title,
              textAlign: TextAlign.center,
              style: TextStyle(
                color: AppTheme.textPrimary,
                fontWeight: FontWeight.w600,
                fontSize: 12,
                fontFamily: isBangla ? 'Kalpurush' : null,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildCurrentDeliveryCard(Map<String, dynamic> delivery) {
    final loc = AppLocalizations.of(context)!;
    final isBangla = Localizations.localeOf(context).languageCode == 'bn';

    return Container(
      padding: const EdgeInsets.all(AppTheme.spacingMd),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(AppTheme.borderRadius),
        border: Border.all(color: AppTheme.borderColor),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                delivery['id'],
                style: const TextStyle(
                  fontWeight: FontWeight.bold,
                  color: AppTheme.textPrimary,
                ),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  color: AppTheme.statusWarning.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Text(
                  delivery['status'],
                  style: TextStyle(
                    color: AppTheme.statusWarning,
                    fontSize: 12,
                    fontWeight: FontWeight.w600,
                    fontFamily: isBangla ? 'Kalpurush' : null,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: AppTheme.spacingSm),
          Text(
            '${loc.riderCustomerName}: ${delivery['customerName']}',
            style: const TextStyle(
              fontWeight: FontWeight.w600,
              color: AppTheme.textPrimary,
            ),
          ),
          const SizedBox(height: AppTheme.spacingSm),
          Text(
            '${loc.riderDeliveryAddress}: ${delivery['deliveryAddress']}',
            style: const TextStyle(color: AppTheme.textSecondary),
          ),
          const SizedBox(height: AppTheme.spacingSm),
          Text(
            '${loc.riderDeliveryAmount}: ${delivery['amount']}',
            style: const TextStyle(
              fontWeight: FontWeight.w600,
              color: AppTheme.statusSuccess,
            ),
          ),
          const SizedBox(height: AppTheme.spacingMd),
          Row(
            children: [
              Expanded(
                child: ElevatedButton(
                  onPressed: () {
                    // TODO: Complete delivery
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppTheme.statusSuccess,
                    foregroundColor: Colors.white,
                  ),
                  child: Text(
                    loc.riderCompleteDelivery,
                    style: TextStyle(fontFamily: isBangla ? 'Kalpurush' : null),
                  ),
                ),
              ),
              const SizedBox(width: AppTheme.spacingSm),
              Expanded(
                child: OutlinedButton(
                  onPressed: () {
                    // TODO: Cancel delivery
                  },
                  style: OutlinedButton.styleFrom(
                    foregroundColor: AppTheme.statusError,
                    side: const BorderSide(color: AppTheme.statusError),
                  ),
                  child: Text(
                    loc.riderCancelDelivery,
                    style: TextStyle(fontFamily: isBangla ? 'Kalpurush' : null),
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildAvailableOrderCard(Map<String, dynamic> order) {
    final loc = AppLocalizations.of(context)!;
    final isBangla = Localizations.localeOf(context).languageCode == 'bn';

    return Container(
      margin: const EdgeInsets.only(bottom: AppTheme.spacingSm),
      padding: const EdgeInsets.all(AppTheme.spacingMd),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(AppTheme.borderRadius),
        border: Border.all(color: AppTheme.borderColor),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                order['id'],
                style: const TextStyle(
                  fontWeight: FontWeight.bold,
                  color: AppTheme.textPrimary,
                ),
              ),
              Text(
                order['earnings'],
                style: const TextStyle(
                  fontWeight: FontWeight.bold,
                  color: AppTheme.statusSuccess,
                  fontSize: 16,
                ),
              ),
            ],
          ),
          const SizedBox(height: AppTheme.spacingSm),
          Text(
            '${loc.riderRestaurantName}: ${order['restaurantName']}',
            style: const TextStyle(
              fontWeight: FontWeight.w600,
              color: AppTheme.textPrimary,
            ),
          ),
          const SizedBox(height: AppTheme.spacingSm),
          Text(
            '${loc.riderDeliveryAddress}: ${order['customerAddress']}',
            style: const TextStyle(color: AppTheme.textSecondary),
          ),
          const SizedBox(height: AppTheme.spacingSm),
          Row(
            children: [
              Text(
                '${loc.riderDistance}: ${order['distance']}',
                style: const TextStyle(
                  color: AppTheme.textSecondary,
                  fontSize: 12,
                ),
              ),
              const SizedBox(width: AppTheme.spacingMd),
              Text(
                '${loc.riderEstimatedTime}: ${order['estimatedTime']}',
                style: const TextStyle(
                  color: AppTheme.textSecondary,
                  fontSize: 12,
                ),
              ),
            ],
          ),
          const SizedBox(height: AppTheme.spacingMd),
          SizedBox(
            width: double.infinity,
            child: ElevatedButton(
              onPressed: () {
                // TODO: Accept order
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: AppTheme.primaryColor,
                foregroundColor: Colors.white,
              ),
              child: Text(
                loc.riderAcceptOrder,
                style: TextStyle(fontFamily: isBangla ? 'Kalpurush' : null),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class DeliveriesTab extends StatelessWidget {
  const DeliveriesTab({super.key});

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context)!;
    return Scaffold(
      appBar: RiderAppBar(title: loc.riderDeliveries, isOnline: true),
      body: const Center(child: Text('Deliveries management coming soon...')),
    );
  }
}

class EarningsTab extends StatelessWidget {
  const EarningsTab({super.key});

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context)!;
    return Scaffold(
      appBar: RiderAppBar(title: loc.riderEarnings, isOnline: true),
      body: const Center(child: Text('Earnings coming soon...')),
    );
  }
}

class ProfileTab extends StatelessWidget {
  const ProfileTab({super.key});

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context)!;
    return Scaffold(
      appBar: RiderAppBar(title: loc.riderProfile, isOnline: true),
      body: const Center(child: Text('Rider profile coming soon...')),
    );
  }
}
