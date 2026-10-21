import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../l10n/app_localizations.dart';

class RiderAppBar extends StatelessWidget implements PreferredSizeWidget {
  final String title;
  final bool isOnline;
  final VoidCallback? onMenuPressed;
  final VoidCallback? onProfilePressed;
  final VoidCallback? onSettingsPressed;
  final VoidCallback? onLogoutPressed;
  final ValueChanged<bool>? onOnlineStatusChanged;

  const RiderAppBar({
    super.key,
    this.title = 'Rider',
    this.isOnline = true,
    this.onMenuPressed,
    this.onProfilePressed,
    this.onSettingsPressed,
    this.onLogoutPressed,
    this.onOnlineStatusChanged,
  });

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context)!;
    final isBangla = Localizations.localeOf(context).languageCode == 'bn';

    return AppBar(
      title: Text(
        isBangla ? 'রাইডার' : title,
        style: TextStyle(fontFamily: isBangla ? 'Kalpurush' : null),
      ),
      backgroundColor: AppTheme.primaryColor,
      foregroundColor: Colors.white,
      leading: IconButton(
        icon: const Icon(Icons.menu),
        onPressed:
            onMenuPressed ??
            () {
              ScaffoldMessenger.of(
                context,
              ).showSnackBar(SnackBar(content: Text(loc.adminMenuComingSoon)));
            },
      ),
      actions: [
        // Online/Offline Toggle
        Container(
          margin: const EdgeInsets.only(right: 8),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                isOnline ? loc.riderOnline : loc.riderOffline,
                style: TextStyle(
                  fontSize: 12,
                  fontFamily: isBangla ? 'Kalpurush' : null,
                ),
              ),
              const SizedBox(width: 4),
              Switch(
                value: isOnline,
                onChanged: onOnlineStatusChanged,
                activeColor: AppTheme.statusSuccess,
                inactiveThumbColor: AppTheme.statusError,
                materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
              ),
            ],
          ),
        ),
        // Profile Menu
        PopupMenuButton<String>(
          icon: const Icon(Icons.person),
          onSelected: (value) {
            switch (value) {
              case 'profile':
                onProfilePressed?.call();
                break;
              case 'settings':
                onSettingsPressed?.call();
                break;
              case 'logout':
                if (onLogoutPressed != null) {
                  onLogoutPressed!();
                } else {
                  Navigator.of(context).popUntil((route) => route.isFirst);
                }
                break;
            }
          },
          itemBuilder: (context) => [
            PopupMenuItem(
              value: 'profile',
              child: Row(
                children: [
                  const Icon(Icons.person, size: 20),
                  const SizedBox(width: 8),
                  Text(
                    loc.riderProfile,
                    style: TextStyle(fontFamily: isBangla ? 'Kalpurush' : null),
                  ),
                ],
              ),
            ),
            PopupMenuItem(
              value: 'settings',
              child: Row(
                children: [
                  const Icon(Icons.settings, size: 20),
                  const SizedBox(width: 8),
                  Text(
                    loc.adminSettings,
                    style: TextStyle(fontFamily: isBangla ? 'Kalpurush' : null),
                  ),
                ],
              ),
            ),
            PopupMenuItem(
              value: 'logout',
              child: Row(
                children: [
                  const Icon(Icons.logout, size: 20),
                  const SizedBox(width: 8),
                  Text(
                    loc.adminLogout,
                    style: TextStyle(fontFamily: isBangla ? 'Kalpurush' : null),
                  ),
                ],
              ),
            ),
          ],
        ),
      ],
    );
  }

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);
}
