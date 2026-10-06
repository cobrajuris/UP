plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

android {
    namespace = "app.note.island"
    compileSdk = 35

    defaultConfig {
        applicationId = "app.note.island"
        minSdk = 28
        targetSdk = 35
        versionCode = 1
        versionName = "0.1.0"
    }

    // Chave fixa para que cada APK novo instale por cima do anterior.
    // Serve só para instalar direto (sideload); não use para a Play Store.
    signingConfigs {
        create("sideload") {
            storeFile = file("note-sideload.jks")
            storePassword = "notenote"
            keyAlias = "note"
            keyPassword = "notenote"
        }
    }

    buildTypes {
        getByName("debug") { signingConfig = signingConfigs.getByName("sideload") }
        getByName("release") {
            isMinifyEnabled = false
            signingConfig = signingConfigs.getByName("sideload")
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions { jvmTarget = "17" }

    lint {
        checkReleaseBuilds = false
        abortOnError = false
    }

    // A ilha é a mesma do protótipo web: note/ é copiada para assets/note no build.
    sourceSets["main"].assets.srcDir(layout.buildDirectory.dir("web"))
}

val copyWeb by tasks.registering(Sync::class) {
    from(rootProject.file("../note")) { exclude("README.md") }
    into(layout.buildDirectory.dir("web/note"))
}
tasks.named("preBuild") { dependsOn(copyWeb) }
