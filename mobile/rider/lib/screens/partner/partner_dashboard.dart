import 'package:flutter/material.dart';
import '../../theme/app_theme.dart';
import '../../widgets/custom_button.dart';
import '../../widgets/partner_app_bar.dart';
import '../../l10n/app_localizations.dart';

class PartnerDashboard extends StatefulWidget {
  const PartnerDashboard({super.key});

  @override
  State<PartnerDashboard> createState() => _PartnerDashboardState();
}

class _PartnerDashboardState extends State<PartnerDashboard> {
  int _currentIndex = 0;

  final List<Widget> _screens = [
    const OverviewTab(),
    const DeliveriesTab(),
    const ReportsTab(),
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
            label: loc.partnerOverview,
          ),
          BottomNavigationBarItem(
            icon: const Icon(Icons.local_shipping),
            label: loc.partnerDeliveries,
          ),
          BottomNavigationBarItem(
            icon: const Icon(Icons.bar_chart),
            label: loc.partnerReports,
          ),
          BottomNavigationBarItem(
            icon: const Icon(Icons.person),
            label: loc.partnerProfile,
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
  final List<Map<String, String>> deliveries = [
    {'id': 'DLV-001', 'item': 'বই', 'status': 'ডেলিভারির জন্য প্রস্তুত'},
    {'id': 'DLV-002', 'item': 'জুতা', 'status': 'ডেলিভারি হচ্ছে'},
    {'id': 'DLV-003', 'item': 'কাপড়', 'status': 'ডেলিভারি সম্পন্ন'},
  ];

  final _addItemController = TextEditingController();

  @override
  void dispose() {
    _addItemController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context)!;
    final isBangla = Localizations.localeOf(context).languageCode == 'bn';

    return Scaffold(
      appBar: const PartnerAppBar(title: 'Partner'),
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
                    loc.partnerWelcomeBack,
                    style: const TextStyle(
                      color: AppTheme.textLight,
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: AppTheme.spacingSm),
                  Text(
                    loc.partnerCompanyName,
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
                    title: loc.partnerTodayDeliveries,
                    value: '24',
                    icon: Icons.local_shipping,
                    color: AppTheme.primaryColor,
                  ),
                ),
                const SizedBox(width: AppTheme.spacingMd),
                Expanded(
                  child: _buildStatCard(
                    title: loc.partnerTotalRevenue,
                    value: '৳12,500',
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
                    title: loc.partnerPendingDeliveries,
                    value: '8',
                    icon: Icons.pending,
                    color: AppTheme.statusWarning,
                  ),
                ),
                const SizedBox(width: AppTheme.spacingMd),
                Expanded(
                  child: _buildStatCard(
                    title: loc.partnerCompletedDeliveries,
                    value: '156',
                    icon: Icons.check_circle,
                    color: AppTheme.statusSuccess,
                  ),
                ),
              ],
            ),
            const SizedBox(height: AppTheme.spacingLg),
            // Quick Actions
            Text(
              loc.partnerQuickActions,
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
                    icon: Icons.add,
                    title: loc.partnerAddDelivery,
                    onTap: _showAddDeliverySheet,
                  ),
                ),
                const SizedBox(width: AppTheme.spacingMd),
                Expanded(
                  child: _buildQuickActionCard(
                    icon: Icons.bar_chart,
                    title: loc.partnerViewReports,
                    onTap: () {
                      // TODO: View reports
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
                    icon: Icons.support_agent,
                    title: loc.partnerSupport,
                    onTap: () {
                      // TODO: Support
                    },
                  ),
                ),
                const SizedBox(width: AppTheme.spacingMd),
                Expanded(
                  child: _buildQuickActionCard(
                    icon: Icons.card_giftcard,
                    title: loc.partnerPromoCode,
                    onTap: () {
                      // TODO: Promo codes
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
                  loc.partnerRecentDeliveries,
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
                  child: Text(loc.partnerViewAll),
                ),
              ],
            ),
            const SizedBox(height: AppTheme.spacingMd),
            if (deliveries.isEmpty)
              Center(
                child: Text(
                  loc.partnerNoRecentDeliveries,
                  style: const TextStyle(
                    color: AppTheme.textSecondary,
                    fontSize: 16,
                  ),
                ),
              )
            else
              ...deliveries.map(
                (delivery) => _buildDeliveryCard(
                  deliveryNumber: delivery['id']!,
                  itemName: delivery['item']!,
                  status: delivery['status']!,
                  statusColor: _getStatusColor(delivery['status']!),
                ),
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
    final isBangla = Localizations.localeOf(context).languageCode == 'bn';

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
            style: TextStyle(
              color: AppTheme.textSecondary,
              fontSize: 14,
              fontFamily: isBangla ? 'Kalpurush' : null,
            ),
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

  Widget _buildDeliveryCard({
    required String deliveryNumber,
    required String itemName,
    required String status,
    required Color statusColor,
  }) {
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
                    fontFamily: isBangla ? 'Kalpurush' : null,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: AppTheme.spacingSm),
          Text(
            itemName,
            style: const TextStyle(
              fontWeight: FontWeight.w600,
              color: AppTheme.textPrimary,
            ),
          ),
          const SizedBox(height: AppTheme.spacingSm),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                loc.partnerItemName,
                style: const TextStyle(
                  color: AppTheme.textSecondary,
                  fontSize: 12,
                ),
              ),
              Row(
                children: [
                  TextButton(
                    onPressed: () {
                      // TODO: View delivery details
                    },
                    child: Text(loc.partnerViewAll),
                  ),
                  if (status != loc.partnerStatusCompleted)
                    TextButton(
                      onPressed: () => _cancelDelivery(deliveryNumber),
                      child: Text(
                        loc.partnerCancel,
                        style: const TextStyle(color: AppTheme.statusError),
                      ),
                    ),
                ],
              ),
            ],
          ),
        ],
      ),
    );
  }

  Color _getStatusColor(String status) {
    final loc = AppLocalizations.of(context)!;
    if (status == loc.partnerStatusReady) return AppTheme.statusInfo;
    if (status == loc.partnerStatusInProgress) return AppTheme.statusWarning;
    if (status == loc.partnerStatusCompleted) return AppTheme.statusSuccess;
    return AppTheme.statusError;
  }

  void _showAddDeliverySheet() {
    final loc = AppLocalizations.of(context)!;
    final isBangla = Localizations.localeOf(context).languageCode == 'bn';

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
      ),
      builder: (context) {
        return Padding(
          padding: EdgeInsets.only(
            left: 24,
            right: 24,
            top: 24,
            bottom: MediaQuery.of(context).viewInsets.bottom + 24,
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                loc.partnerAddNewDelivery,
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 18,
                  fontFamily: isBangla ? 'Kalpurush' : null,
                ),
              ),
              const SizedBox(height: 16),
              TextField(
                controller: _addItemController,
                decoration: InputDecoration(
                  labelText: loc.partnerEnterItemName,
                  border: const OutlineInputBorder(),
                  labelStyle: TextStyle(
                    fontFamily: isBangla ? 'Kalpurush' : null,
                  ),
                ),
              ),
              const SizedBox(height: 16),
              Row(
                children: [
                  Expanded(
                    child: ElevatedButton.icon(
                      icon: const Icon(Icons.check),
                      label: Text(
                        loc.partnerAdd,
                        style: TextStyle(
                          fontFamily: isBangla ? 'Kalpurush' : null,
                        ),
                      ),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.white,
                        foregroundColor: AppTheme.primaryColor,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(8),
                        ),
                      ),
                      onPressed: () {
                        if (_addItemController.text.trim().isNotEmpty) {
                          setState(() {
                            deliveries.insert(0, {
                              'id': 'DLV-${deliveries.length + 1}'.padLeft(
                                7,
                                '0',
                              ),
                              'item': _addItemController.text.trim(),
                              'status': loc.partnerStatusReady,
                            });
                          });
                          _addItemController.clear();
                          Navigator.pop(context);
                        }
                      },
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: OutlinedButton(
                      style: OutlinedButton.styleFrom(
                        backgroundColor: Colors.white,
                        foregroundColor: AppTheme.primaryColor,
                        side: const BorderSide(color: AppTheme.primaryColor),
                      ),
                      child: Text(
                        loc.partnerCancel,
                        style: TextStyle(
                          fontFamily: isBangla ? 'Kalpurush' : null,
                        ),
                      ),
                      onPressed: () => Navigator.pop(context),
                    ),
                  ),
                ],
              ),
            ],
          ),
        );
      },
    );
  }

  void _cancelDelivery(String id) {
    final loc = AppLocalizations.of(context)!;
    setState(() {
      deliveries.removeWhere((d) => d['id'] == id);
    });
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text('${loc.partnerDeliveryCancelled} $id')),
    );
  }
}

class DeliveriesTab extends StatelessWidget {
  const DeliveriesTab({super.key});

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context)!;
    return Scaffold(
      appBar: PartnerAppBar(title: loc.partnerDeliveries),
      body: const Center(child: Text('Deliveries management coming soon...')),
    );
  }
}

class ReportsTab extends StatelessWidget {
  const ReportsTab({super.key});

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context)!;
    return Scaffold(
      appBar: PartnerAppBar(title: loc.partnerReports),
      body: const Center(child: Text('Reports coming soon...')),
    );
  }
}

class ProfileTab extends StatelessWidget {
  const ProfileTab({super.key});

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context)!;
    return Scaffold(
      appBar: PartnerAppBar(title: loc.partnerProfile),
      body: const Center(child: Text('Partner profile coming soon...')),
    );
  }
}
