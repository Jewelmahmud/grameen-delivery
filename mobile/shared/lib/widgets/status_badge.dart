import 'package:flutter/material.dart';
import '../constants/app_constants.dart';
import '../theme/app_theme.dart';

class StatusBadge extends StatelessWidget {
  final String status;
  final bool isBangla;
  final double fontSize;

  const StatusBadge({
    super.key,
    required this.status,
    this.isBangla = false,
    this.fontSize = 12.0,
  });

  Color _getStatusColor() {
    switch (status) {
      case AppConstants.statusDelivered:
        return AppTheme.statusSuccess;
      case AppConstants.statusInTransit:
      case AppConstants.statusPickedUp:
        return AppTheme.statusWarning;
      case AppConstants.statusAssigned:
      case AppConstants.statusReady:
        return AppTheme.accentColor;
      case AppConstants.statusCancelled:
      case AppConstants.statusFailed:
        return AppTheme.statusError;
      default:
        return AppTheme.statusNeutral;
    }
  }

  @override
  Widget build(BuildContext context) {
    final color = _getStatusColor();
    final label = AppConstants.getStatusLabel(status, isBangla: isBangla);

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(
        color: color.withOpacity(0.12),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: color.withOpacity(0.4), width: 1),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            width: 7,
            height: 7,
            decoration: BoxDecoration(
              color: color,
              shape: BoxShape.circle,
            ),
          ),
          const SizedBox(width: 6),
          Text(
            label,
            style: TextStyle(
              color: color,
              fontSize: fontSize,
              fontWeight: FontWeight.w600,
            ),
          ),
        ],
      ),
    );
  }
}
