(function (global) {
    System.config({
        warnings: true,
        transpiler: false,
        paths: {
            'npm:': 'node_modules/',
            'assets:': 'assets/'
        },
        meta: {
            '*.css': { loader: 'css' },
            'npm:angular/angular': { format: 'global', exports: 'angular' },
            'npm:angular-animate/angular-animate.js': {
                'deps': [
                    'angular'
                ],
            },
            'npm:angular-animate/angular-animate.js': {
                'deps': [
                    'angular'
                ]
            },
            'npm:angular-local-storage/dist/angular-local-storage.js': {
                'deps': [
                    'angular'
                ]
            },
            'npm:angular-messages/angular-messages.js': {
                'deps': [
                    'angular'
                ]
            },
            'npm:angular-resource/angular-resource.js': {
                'deps': [
                    'angular'
                ]
            },
            'npm:angular-sanitize/angular-sanitize.js': {
                'deps': [
                    'angular'
                ]
            },
            'npm:angular-slimscroll/angular-slimScroll.js': {
                'deps': [
                    'angular'
                ]
            },
            'npm:angular-sweetalert/SweetAlert.js': {
                'deps': [
                    'angular'
                ]
            },
            'npm:angular-ui-bootstrap/dist/ui-bootstrap-tpls.js': {
                'deps': [
                    'angular'
                ]
            },
            'npm:@uirouter/angularjs/release/angular-ui-router.js': {
                'deps': [
                    'angular'
                ]
            },
            'npm:angular-animate/angular-animate.min.js': {
                'deps': [
                    'angular'
                ]
            },
            'npm:bootstrap-hover-dropdown/bootstrap-hover-dropdown.js': {
                'deps': [
                    'jquery',
                    'bootstrap/js/bootstrap'
                ]
            },
            'npm:jquery-slimscroll/jquery.slimscroll.min.js': {
                'deps': [
                    'jquery'
                ]
            },
            'npm:angular-slimscroll/angular-slimscroll.js': {
                'deps': [
                    'jquery-slimscroll'
                ]
            },
            'npm:simple-web-notification/web-notification.js': { format: 'global', exports: 'webNotification' },
            'npm:angular-web-notification/angular-web-notification.js': {
                'deps': [
                    'simple-web-notification'
                ]
            },
            'npm:angular-file-upload/dist/angular-file-upload.js': {
                'deps': [
                    'angular'
                ]
            },
            'npm:angular-bootstrap-datetimepicker/src/js/datetimepicker.templates.js': {
                'deps': [
                    'angular',
                    'moment',
                    'angular-bootstrap-datetimepicker-core'
                ]
            },
            'npm:angular-signalr-hub/signalr-hub.js': {
                'deps': [
                    'signalr'
                ]
            },
        },
        // map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            app: 'app',

            // angular bundles
            'angular': 'npm:angular/angular.min.js',
            'angular-animate': 'npm:angular-animate/angular-animate.min.js',
            'angular-authz': 'npm:angular-authz/dist/angular-authz.min.js',
            'angular-chart.js': 'npm:angular-chart.js/dist/angular-chart.js',
            'angular-local-storage': 'npm:angular-local-storage/dist/angular-local-storage.min.js',
            'angular-messages': 'npm:angular-messages/angular-messages.min.js',
            'angular-resource': 'npm:angular-resource/angular-resource.min.js',
            'angular-sanitize': 'npm:angular-sanitize/angular-sanitize.min.js',
            'angular-slimscroll': 'npm:angular-slimscroll/angular-slimscroll.js',
            'angular-sweetalert': 'npm:angular-sweetalert/SweetAlert.min.js',
            'angular-ui-bootstrap': 'npm:angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
            '@uirouter/angularjs': 'npm:@uirouter/angularjs/release/angular-ui-router.js',
            'angular-ui-select': 'npm:angular-ui-select/select.js',
            'angular-file-upload': 'npm:angular-file-upload/dist/angular-file-upload.js',
            'ui-router-visualizer': 'npm:ui-router-visualizer/release/visualizer.min.js',
            'angular-web-notification': 'npm:angular-web-notification/angular-web-notification.js',
            'simple-web-notification': 'npm:simple-web-notification/web-notification.js',
            'bootstrap': 'npm:/bootstrap/dist/js/bootstrap.js',
            'bootstrap-hover-dropdown': 'npm:bootstrap-hover-dropdown/bootstrap-hover-dropdown.js',
            'chart': 'npm:chart.js/dist/Chart.min.js',
            'font-awesome': 'npm:/font-awesome.js',
            'jquery': 'npm:jquery/dist/jquery.js',
            'jquery-slimscroll': 'npm:jquery-slimscroll/jquery.slimscroll.min.js',
            'moment': 'npm:moment/min/moment-with-locales.js',
            'moment-timezone': 'npm:moment-timezone/moment-timezone.js',
            'toastr': 'npm:toastr/build/toastr.min.js',
            'css': 'npm:systemjs-plugin-css/css.js',
            'text': 'npm:systemjs-plugin-text/text.js',
            'sweetalert': 'npm:sweetalert/lib/sweet-alert.js',
            'sweetalertcss': 'npm:sweetalert/lib/sweet-alert.css',
            'AdminLte': 'assets:js/app.js',
            'evitarLink': 'app/directives/evitarLink.js',
            'ui.bootstrap.showErrors': 'app/directives/showErrors.js',
            'signalr': 'npm:signalr/jquery.signalR.js',
            'angular-signalr-hub': 'npm:angular-signalr-hub/signalr-hub.js',
            'angular-bootstrap-datetimepicker-core': 'npm:angular-bootstrap-datetimepicker/src/js/datetimepicker.js',
            'angular-bootstrap-datetimepicker': 'npm:angular-bootstrap-datetimepicker/src/js/datetimepicker.templates.js'
        },
        packages: {
            'app': {
                main: 'main.js',
                defaultExtension: 'js'
            }
        }
    });
})(this);