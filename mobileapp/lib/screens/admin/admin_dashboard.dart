import 'package:flutter/material.dart';
import '../../theme/app_theme.dart';
import '../../widgets/custom_button.dart';
import '../../widgets/admin_app_bar.dart';
import '../../l10n/app_localizations.dart';

class AdminDashboard extends StatefulWidget {
  const AdminDashboard({super.key});

  @override
  State<AdminDashboard> createState() => _AdminDashboardState();
}

class _AdminDashboardState extends State<AdminDashboard> {
  int _currentIndex = 0;

  final List<Widget> _screens = [
    const OverviewTab(),
    const DeliveriesTab(),
    const PartnersTab(),
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
            label: loc.adminOverview,
          ),
          BottomNavigationBarItem(
            icon: const Icon(Icons.local_shipping),
            label: loc.adminDeliveries,
          ),
          BottomNavigationBarItem(
            icon: const Icon(Icons.business),
            label: loc.adminPartners,
          ),
          BottomNavigationBarItem(
            icon: const Icon(Icons.person),
            label: loc.adminProfile,
          ),
        ],
      ),
    );
  }
}

class OverviewTab extends StatelessWidget {
  const OverviewTab({super.key});

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context)!;
    return Scaffold(
      appBar: const AdminAppBar(title: 'Admin'),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(AppTheme.spacingLg),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Welcome Section
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(AppTheme.spacingLg),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [AppTheme.primaryColor, AppTheme.primaryDark],
                ),
                borderRadius: BorderRadius.circular(AppTheme.borderRadius),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    loc.adminWelcomeBack,
                    style: const TextStyle(
                      color: AppTheme.textLight,
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: AppTheme.spacingSm),
                  Text(
                    loc.adminCompanyName,
                    style: const TextStyle(
                      color: AppTheme.textLight,
                      fontSize: 16,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: AppTheme.spacingLg),
            // Stats Cards
            Row(
              children: [
                Expanded(
                  child: _buildStatCard(
                    title: loc.adminTodayDeliveries,
                    value: '156',
                    icon: Icons.local_shipping,
                    color: AppTheme.primaryColor,
                  ),
                ),
                const SizedBox(width: AppTheme.spacingMd),
                Expanded(
                  child: _buildStatCard(
                    title: loc.adminTotalRevenue,
                    value: '৳45,600',
                    icon: Icons.attach_money,
                    color: AppTheme.statusSuccess,
                  ),
                ),
              ],
            ),
            const SizedBox(height: AppTheme.spacingMd),
            Row(
              children: [
                Expanded(
                  child: _buildStatCard(
                    title: loc.adminPendingDeliveries,
                    value: '23',
                    icon: Icons.pending,
                    color: AppTheme.statusWarning,
                  ),
                ),
                const SizedBox(width: AppTheme.spacingMd),
                Expanded(
                  child: _buildStatCard(
                    title: loc.adminActivePartners,
                    value: '45',
                    icon: Icons.business,
                    color: AppTheme.secondaryColor,
                  ),
                ),
              ],
            ),
            const SizedBox(height: AppTheme.spacingLg),
            // Additional Stats
            Row(
              children: [
                Expanded(
                  child: _buildStatCard(
                    title: loc.adminTotalRiders,
                    value: '89',
                    icon: Icons.delivery_dining,
                    color: AppTheme.statusInfo,
                  ),
                ),
                const SizedBox(width: AppTheme.spacingMd),
                Expanded(
                  child: _buildStatCard(
                    title: loc.adminTotalCustomers,
                    value: '1,234',
                    icon: Icons.people,
                    color: AppTheme.primaryLight,
                  ),
                ),
              ],
            ),
            const SizedBox(height: AppTheme.spacingLg),
            // Quick Actions
            Text(
              loc.adminQuickActions,
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
                    icon: Icons.person_add,
                    title: loc.adminAddPartner,
                    onTap: () {
                      // TODO: Add partner
                    },
                  ),
                ),
                const SizedBox(width: AppTheme.spacingMd),
                Expanded(
                  child: _buildQuickActionCard(
                    icon: Icons.delivery_dining,
                    title: loc.adminManageRiders,
                    onTap: () {
                      // TODO: Manage riders
                    },
                  ),
                ),
              ],
            ),
            const SizedBox(height: AppTheme.spacingMd),
            Row(
              children: [
                Expanded(
                  child: _buildQuickActionCard(
                    icon: Icons.settings,
                    title: loc.adminDeliverySettings,
                    onTap: () {
                      // TODO: Delivery settings
                    },
                  ),
                ),
                const SizedBox(width: AppTheme.spacingMd),
                Expanded(
                  child: _buildQuickActionCard(
                    icon: Icons.analytics,
                    title: loc.adminViewReports,
                    onTap: () {
                      // TODO: View reports
                    },
                  ),
                ),
              ],
            ),
            const SizedBox(height: AppTheme.spacingLg),
            // Recent Deliveries
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  loc.adminRecentDeliveries,
                  style: const TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                    color: AppTheme.textPrimary,
                  ),
                ),
                TextButton(
                  onPressed: () {
                    // TODO: View all deliveries
                  },
                  child: Text(loc.adminViewAll),
                ),
              ],
            ),
            const SizedBox(height: AppTheme.spacingMd),
            _buildRecentDeliveryCard(
              deliveryNumber: 'DEL-2024-001',
              customerName: 'আহমেদ হাসান',
              address: 'হাউস #45, রোড #12, ধানমন্ডি, ঢাকা',
              amount: '৳250',
              status: loc.adminStatusInProgress,
              statusColor: AppTheme.statusWarning,
            ),
            const SizedBox(height: AppTheme.spacingSm),
            _buildRecentDeliveryCard(
              deliveryNumber: 'DEL-2024-002',
              customerName: 'ফাতেমা বেগম',
              address: 'ফ্ল্যাট #3A, বিল্ডিং #7, উত্তরা, ঢাকা',
              amount: '৳180',
              status: loc.adminStatusCompleted,
              statusColor: AppTheme.statusSuccess,
            ),
            const SizedBox(height: AppTheme.spacingSm),
            _buildRecentDeliveryCard(
              deliveryNumber: 'DEL-2024-003',
              customerName: 'করিম আহমেদ',
              address: 'রোড #8, ব্লক #C, মিরপুর-10, ঢাকা',
              amount: '৳320',
              status: loc.adminStatusPending,
              statusColor: AppTheme.statusInfo,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildStatCard({
    required String title,
    required String value,
    required IconData icon,
    required Color color,
  }) {
    return Container(
      padding: const EdgeInsets.all(AppTheme.spacingMd),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(AppTheme.borderRadius),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.1),
            blurRadius: 4,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Icon(icon, color: color, size: 24),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  color: color.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Text(
                  value,
                  style: TextStyle(
                    color: color,
                    fontWeight: FontWeight.bold,
                    fontSize: 16,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: AppTheme.spacingSm),
          Text(
            title,
            style: const TextStyle(color: AppTheme.textSecondary, fontSize: 14),
          ),
        ],
      ),
    );
  }

  Widget _buildQuickActionCard({
    required IconData icon,
    required String title,
    required VoidCallback onTap,
  }) {
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
              style: const TextStyle(
                color: AppTheme.textPrimary,
                fontWeight: FontWeight.w600,
                fontSize: 12,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildRecentDeliveryCard({
    required String deliveryNumber,
    required String customerName,
    required String address,
    required String amount,
    required String status,
    required Color statusColor,
  }) {
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
                deliveryNumber,
                style: const TextStyle(
                  fontWeight: FontWeight.bold,
                  color: AppTheme.textPrimary,
                ),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  color: statusColor.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Text(
                  status,
                  style: TextStyle(
                    color: statusColor,
                    fontSize: 12,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: AppTheme.spacingSm),
          Text(
            customerName,
            style: const TextStyle(
              fontWeight: FontWeight.w600,
              color: AppTheme.textPrimary,
            ),
          ),
          const SizedBox(height: AppTheme.spacingXs),
          Text(
            address,
            style: const TextStyle(color: AppTheme.textSecondary, fontSize: 12),
          ),
          const SizedBox(height: AppTheme.spacingSm),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                amount,
                style: const TextStyle(
                  fontWeight: FontWeight.bold,
                  color: AppTheme.primaryColor,
                  fontSize: 16,
                ),
              ),
              TextButton(
                onPressed: () {
                  // TODO: View delivery details
                },
                child: const Text('View Details'),
              ),
            ],
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
      appBar: AdminAppBar(title: loc.adminDeliveries),
      body: const Center(child: Text('Deliveries management coming soon...')),
    );
  }
}

class PartnersTab extends StatelessWidget {
  const PartnersTab({super.key});

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context)!;
    return Scaffold(
      appBar: AdminAppBar(title: loc.adminPartners),
      body: const Center(child: Text('Partners management coming soon...')),
    );
  }
}

class ProfileTab extends StatelessWidget {
  const ProfileTab({super.key});

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context)!;
    return Scaffold(
      appBar: AdminAppBar(title: loc.adminProfile),
      body: const Center(child: Text('Admin profile coming soon...')),
    );
  }
}
