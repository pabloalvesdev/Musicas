package expo.modules.audiometadata

import android.media.MediaMetadataRetriever
import android.net.Uri
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class AudioMetadataModule : Module() {

  override fun definition() = ModuleDefinition {
    Name("AudioMetadata")

    AsyncFunction("getMetadata") { uriString: String ->
      val retriever = MediaMetadataRetriever()

      try {
        val context = appContext.reactContext
          ?: throw Exception("React context não disponível")

        val uri = Uri.parse(uriString)

        retriever.setDataSource(context, uri)

        val title = retriever.extractMetadata(
          MediaMetadataRetriever.METADATA_KEY_TITLE
        )

        val artist = retriever.extractMetadata(
          MediaMetadataRetriever.METADATA_KEY_ARTIST
        )

        val album = retriever.extractMetadata(
          MediaMetadataRetriever.METADATA_KEY_ALBUM
        )

        val albumArtist = retriever.extractMetadata(
          MediaMetadataRetriever.METADATA_KEY_ALBUMARTIST
        )

        val genre = retriever.extractMetadata(
          MediaMetadataRetriever.METADATA_KEY_GENRE
        )

        val duration = retriever.extractMetadata(
          MediaMetadataRetriever.METADATA_KEY_DURATION
        )?.toLongOrNull() ?: 0L

        val year = retriever.extractMetadata(
          MediaMetadataRetriever.METADATA_KEY_YEAR
        )?.toIntOrNull()

        val trackNumber = retriever.extractMetadata(
          MediaMetadataRetriever.METADATA_KEY_CD_TRACK_NUMBER
        )?.let {
          it.split("/").firstOrNull()?.toIntOrNull()
        }

        val discNumber = retriever.extractMetadata(
          MediaMetadataRetriever.METADATA_KEY_DISC_NUMBER
        )?.let {
          it.split("/").firstOrNull()?.toIntOrNull()
        }

        val artwork = retriever.embeddedPicture?.let { bytes ->
          android.util.Base64.encodeToString(
            bytes,
            android.util.Base64.NO_WRAP
          )
        }

        mapOf(
          "title" to title,
          "artist" to artist,
          "album" to album,
          "albumArtist" to albumArtist,
          "genre" to genre,
          "duration" to duration,
          "year" to year,
          "trackNumber" to trackNumber,
          "discNumber" to discNumber,
        
        )
      } finally {
        retriever.release()
      }
    }
  }
}
